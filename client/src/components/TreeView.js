import React, { Component } from 'react';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import SortableTree, { changeNodeAtPath } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-minimal';
import intl from 'react-intl-universal';
import { TreeViewTypes } from '../utils/enum/enums';
import { setFindType, setFindMaterial, setFindTiming } from '../actions/findNotification';

class TreeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: generateTreeData(this.props.for, this.props.content),
      type: this.props.for
    };
  }

  static getDerivedStateFromProps(props, state) {
    // Change values only if type is changed
    if (props.for !== state.type) {
      return {
        treeData: generateTreeData(props.for, props.content),
        type: props.for
      };
    }
    return null;
  }

  onSelectCheckbox = treeObj => event => {
    // Change redux state
    const title = event.target.checked ? treeObj.node.title.toLowerCase() : '';
    if (this.state.type === TreeViewTypes.TYPE) {
      this.props.setFindType(title, this.props.currentFindIndex);
    } else if (this.state.type === TreeViewTypes.ERAS) {
      this.props.setFindTiming(title, this.props.currentFindIndex);
    } else if (this.state.type === TreeViewTypes.MATERIAL) {
      this.props.setFindMaterial(title, this.props.currentFindIndex);
    }
    // Update the tree
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

const mapStateToProps = (state) => ({
  currentFindIndex: state.findNotification.currentFindIndex
});

const mapDispatchToProps = (dispatch) => ({
  setFindType: (findType, index) => dispatch(setFindType(findType, index)),
  setFindMaterial: (findMaterial, index) => dispatch(setFindMaterial(findMaterial, index)),
  setFindTiming: (findTiming, index) => dispatch(setFindTiming(findTiming, index))
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);