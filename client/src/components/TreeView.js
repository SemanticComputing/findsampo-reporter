import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SortableTree, { changeNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import intl from 'react-intl-universal';

class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: getErasTreeData(this.props.content)
    };
  }

  onSelectCheckbox = treeObj => event => {
    const newTreeData = changeNodeAtPath({
      treeData: this.state.treeData,
      getNodeKey: ({ treeIndex }) => treeIndex,
      path: treeObj.path,
      newNode: {
        ...treeObj.node,
        selected: event.target.checked
      },
    });

    this.setState({ treeData: newTreeData });
  };

  render() {
    console.log(this.state.treeData);
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          canDrag={false}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          generateNodeProps={(n) => ({
            title: (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={n.node.selected}
                    onChange={this.onSelectCheckbox(n)}
                    color="primary"
                  />
                }
                label={n.node.title}
              />
            ),
          })}
        />
      </div>
    );
  }
}

const getErasTreeData = (data) => {
  const nodes = [];
  for (let e of data) {
    nodes.push(
      {
        title: generateTitle(e),
        children: e.periods.map((period) => ({ title: generateTitle(period), selected: false })),
        selected: false
      }
    );
  }
  return nodes;
};

const generateTitle = (obj) => {
  return (
    intl.get(obj.epoch)
    + ' '
    + obj.start.value
    + intl.get(obj.start.unit)
    + ' — '
    + obj.end.value
    + intl.get(obj.end.unit)
  );
};

export default TreeView;