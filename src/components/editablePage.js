import React from 'react';
import EditableBlock from './editableBlock';
import setCaretToEnd from '../helpers/setCaretToEnd';

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initialBlocks = [{id: uid(), html: "Welcome.", tag: "h1"}, {id: uid(), html: "Type '/' to bring up the block type menu", tag: "p"}];

class EditablePage extends React.Component {
    constructor(props) {
        super(props);
        this.updatePageHandler = this.updatePageHandler.bind(this);
        this.addBlockHandler = this.addBlockHandler.bind(this);
        this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
        this.state = {blocks: [...initialBlocks]};
    }

    updatePageHandler(updatedBlock) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: updatedBlock.tag,
            html: updatedBlock.html
        };
        this.setState({blocks: updatedBlocks});
    }

    addBlockHandler(currentBlock) {
        const newBlock = {id: uid(), html: "", tag: "p"};
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index+1, 0, newBlock);
        this.setState({blocks: updatedBlocks}, () => {
            currentBlock.ref.nextElementSibling.focus();
        });
    }

    deleteBlockHandler(currentBlock) {
        const previousBlock = currentBlock.ref.previousElementSibling;
        if (previousBlock) {
            const blocks = this.state.blocks;
            const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
            const updatedBlocks = [...blocks];
            updatedBlocks.splice(index, 1);
            this.setState({blocks: updatedBlocks}, () => {
                setCaretToEnd(previousBlock);
                previousBlock.focus();
            });
        }
    }

    render() {
        return (
            <div className="Page">
                {this.state.blocks.map((block, key) => {
                    return (
                       <EditableBlock 
                        key={key}
                        id={block.id}
                        tag={block.tag}
                        html={block.html}
                        updatePage={this.updatePageHandler}
                        deleteBlock={this.deleteBlockHandler}
                        addBlock={this.addBlockHandler}
                        />
                    );
                })}
            </div>
        );
    }
}

export default EditablePage;