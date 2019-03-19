import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import { PhotosOf } from '../../helpers/enum/enums';
import { setFindSitePhotos, setFindPhotos } from '../../actions/findNotification';

class PhotoRenderer extends Component {
  state = {
    isPhotoDialogOpen: false,
    photos: []
  }

  onOpenPhotoDialogPressed = () => {
    this.setState({ isPhotoDialogOpen: !this.state.isPhotoDialogOpen });
  }

  onFilesSelected = (files) => {
    // Loop through the FileList
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (() => {
        return (e) => {
          // Render thumbnails
          this.setState((prevState) => ({
            photos: [...prevState.photos, e.target.result]
          }));
        };
      })(file);
      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
    }
  }

  onPhotoPickerPressed = (event) => {
    const files = event.target.files;
    this.onFilesSelected(files);
    if (this.props.for === PhotosOf.FIND_SITE) {
      this.props.setFindSitePhotos(files);
    } else {
      this.props.setFindPhotos(files);
    }
    this.onOpenPhotoDialogPressed();
  }

  render() {
    return (
      <div className="photo-renderer">
        <Icon onClick={this.onOpenPhotoDialogPressed}>add</Icon>
        <Dialog
          onClose={this.onOpenPhotoDialogPressed}
          aria-labelledby="photo-dialog"
          open={this.state.isPhotoDialogOpen}
        >
          <DialogTitle id="photo-dialog">Add photo</DialogTitle>
          <div>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Icon>camera_alt</Icon>
                  </Avatar>
                </ListItemAvatar>
                <input
                  type="file"
                  id="photo-from-camera"
                  accept="image/*"
                  className="answer-options__input"
                  onChange={this.onPhotoPickerPressed}
                  capture
                />
                <label htmlFor="photo-from-camera" className="answer-options__label">Take Photo</label>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Icon>insert_photo</Icon>
                  </Avatar>
                </ListItemAvatar>
                <input
                  type="file"
                  id="photo-from-gallery"
                  className="answer-options__input"
                  accept="image/*"
                  onChange={this.onPhotoPickerPressed}
                  multiple
                />
                <label htmlFor="photo-from-gallery" className="answer-options__label">Select from gallery</label>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Icon>cancel</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cancel" />
              </ListItem>
            </List>
          </div>
        </Dialog>
        <output>
          <div>
            {
              this.state.photos.length > 0 &&
              <span>
                {
                  this.state.photos.map((photo, index) => {
                    return (
                      <img
                        className="photo-renderer__photo"
                        src={photo}
                        key={index}
                      />
                    );
                  })
                }
              </span>
            }
          </div>
        </output>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFindSitePhotos: (photos) => dispatch(setFindSitePhotos(photos)),
  setFindPhotos: (photos) => dispatch(setFindPhotos(photos)),
});

export default connect(undefined, mapDispatchToProps)(PhotoRenderer);