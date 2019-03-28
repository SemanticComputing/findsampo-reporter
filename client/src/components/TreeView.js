import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import SortableTree, { changeNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import intl from 'react-intl-universal';
import { TreeViewTypes } from '../helpers/enum/enums';


class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: generateTreeData(this.props.for, this.props.content)
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      treeData: generateTreeData(props.for, props.content)
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
    return (
      <div className="tree-view" style={{ flex: 1 }}>
        <SortableTree
          treeData={this.state.treeData}
          canDrag={false}
          isVirtualized={false}
          rowHeight={70}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
          generateNodeProps={(n) => ({
            title: (
              <label className="tree-view__label">
                <Checkbox
                  checked={n.node.selected}
                  onChange={this.onSelectCheckbox(n)}
                  color="primary"
                  className="tree-view__label__checkbox"
                />
                <div className="tree-view__label__texts">
                  <span className="tree-view__label__texts__title">{n.node.title}</span>
                  <span className="tree-view__label__texts__extras">{n.node.extras}</span>
                </div>
              </label>
            )
          })}
        />
      </div>
    );
  }
}


const generateTreeData = (treeViewType, content) => {
  if (treeViewType === TreeViewTypes.TYPE) {
    return getTypesTreeData(content);
  } else if (treeViewType === TreeViewTypes.ERAS) {
    return getErasTreeData(content);
  } else if (treeViewType === TreeViewTypes.MATERIAL) {
    return getMaterialsTreeData(content);
  }
};


const getTypesTreeData = (data) => {
  const nodes = [];
  for (let e of data) {
    nodes.push(
      {
        title: intl.get(e),
        selected: false
      }
    );
  }
  return nodes;
};

const getMaterialsTreeData = (data) => {
  const nodes = [];
  for (let e of data) {
    nodes.push(
      {
        title: intl.get(e),
        selected: false
      }
    );
  }
  return nodes;
};

const getErasTreeData = (data) => {
  const nodes = [];
  for (let e of data) {
    nodes.push(
      {
        title: generateTitle(e),
        extras: generateErasExtras(e),
        children: e.periods.map((period) => ({
          title: generateTitle(period),
          extras: generateErasExtras(period),
          selected: false
        })),
        selected: false
      }
    );
  }
  return nodes;
};

const generateTitle = (obj) => {
  return (
    intl.get(obj.epoch)
  );
};

const generateErasExtras = (obj) => {
  return ''.concat(
    obj.start.value,
    intl.get(obj.start.unit),
    ' — ', obj.end.value,
    intl.get(obj.end.unit)
  );
};


export default TreeView;