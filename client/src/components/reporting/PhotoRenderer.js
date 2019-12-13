import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Icon,
  IconButton,
  Button,
  Typography
} from '@material-ui/core/';
import intl from 'react-intl-universal';
import { PhotosOf } from '../../helpers/enum/enums';
import { changeSnipperStatus } from '../../actions/notifier';
import { setFindSitePhotos, setFindPhotos, deletePhotos } from '../../actions/findNotification';
import ImageViewer from '../ImageViewer';
import { getIdfromUri, getThumbId } from '../../helpers/functions/functions';

class PhotoRenderer extends Component {
  constructor(props) {
    super(props);
    this.captureInputRef = React.createRef();
    this.galleryInputRef = React.createRef();
  }

  state = {
    isPhotoDialogOpen: false,
    isPhotoAlertDialogOpen: false,
    findSitePhotos: [],
    findPhotos: [],
  }

  onOpenPhotoDialogPressed = () => {
    this.setState({ isPhotoDialogOpen: !this.state.isPhotoDialogOpen });
  }

  onOpenPhotoAlertDialogPressed = () => {
    this.setState({
      isPhotoAlertDialogOpen: !this.state.isPhotoAlertDialogOpen,
    });
  }

  /* Files are not stored in memory anymore
  onFilesSelected = (files) => {
    // Loop through the FileList
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // If file size is bigger than the limit stop the process
      if (file.size > MAX_FILE_SIZE) {
        this.setState({ isPhotoAlertDialogOpen: true });
        return;
      }
      const reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (() => {
        return (e) => {
          // Render thumbnails
          if (this.props.for === PhotosOf.FIND_SITE) {
            this.setState((prevState) => ({
              findSitePhotos: [...prevState.findSitePhotos, e.target.result]
            }));
          } else {
            this.setState((prevState) => ({
              findPhotos: [...prevState.findPhotos, e.target.result]
            }));
          }
        };
      })(file);
      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
    }
  } */

  onPhotoPickerPressed = (event) => {
    const files = event.target.files;
    const currentFind = this.props.finds[this.props.currentFindIndex];
    const findSitePhotosCount = currentFind.findSite.photos ? currentFind.findSite.photos.length : 0;
    const findPhotosCount = currentFind.photos ? currentFind.photos.length : 0;

    // Show the spinner before starting the process
    this.props.changeSnipperStatus(true);
    if (this.props.for === PhotosOf.FIND_SITE) {
      this.props.setFindSitePhotos(files, this.props.currentFindIndex, findSitePhotosCount);
    } else {
      this.props.setFindPhotos(files, this.props.currentFindIndex, findPhotosCount);
    }
    this.onOpenPhotoDialogPressed();
  }

  onDeletePhotoPressed = (photo, photoIndex, photoType) => {
    const id = getIdfromUri('images', photo);
    const thumbID = getThumbId(id);
    this.props.deletePhotos([id, thumbID], this.props.currentFindIndex, photoIndex, photoType);
  }

  renderPhotos() {
    const currentFind = this.props.finds[this.props.currentFindIndex];
    let currentModePhotos = this.props.for === PhotosOf.FIND
      ? currentFind.photos
      : currentFind.findSite.photos;

    if (currentModePhotos && currentModePhotos.length > 0) {
      return (
        <span className="photo-renderer__output__span">
          {
            currentModePhotos.map((photo, index) => (
              <div key={index} className="photo-renderer__output__span__container" >
                <ImageViewer image={photo} />
                <IconButton onClick={() => this.onDeletePhotoPressed(photo, index, this.props.for)}>
                  <Icon className="photo-renderer__output__span__container__icon">delete_forever</Icon>
                </IconButton>
              </div>
            ))
          }
        </span>
      );
    }
  }

  renderAlertDialog = () => {
    return (
      <Dialog
        open={this.state.isPhotoAlertDialogOpen}
        onClose={this.onOpenPhotoAlertDialogPressed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{intl.get('photoRenderer.errorHeader')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {intl.get('photoRenderer.errorText')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onOpenPhotoAlertDialogPressed} color="primary" autoFocus>
            {intl.get('photoRenderer.confirmationBtn')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }


  renderAddPhotoDialog() {
    return (
      <Dialog
        onClose={this.onOpenPhotoDialogPressed}
        aria-labelledby="photo-dialog"
        open={this.state.isPhotoDialogOpen}
      >
        <DialogTitle id="photo-dialog">{intl.get('photoRenderer.dialog.title')}</DialogTitle>
        <div>
          <List>
            <ListItem button onClick={() => this.captureInputRef.current.click()}>
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
                ref={this.captureInputRef}
              />
              <label className="answer-options__label">{intl.get('photoRenderer.dialog.takePhoto')}</label>
            </ListItem>
            <ListItem button onClick={() => this.galleryInputRef.current.click()}>
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
                ref={this.galleryInputRef}
              />
              <label className="answer-options__label">{intl.get('photoRenderer.dialog.selectFromGallery')}</label>
            </ListItem>
            <ListItem button onClick={this.onOpenPhotoDialogPressed}>
              <ListItemAvatar>
                <Avatar>
                  <Icon>cancel</Icon>
                </Avatar>
              </ListItemAvatar>
              <label className="answer-options__label">{intl.get('photoRenderer.dialog.cancel')}</label>
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }

  render() {
    return (
      <div className="photo-renderer">
        <Icon onClick={this.onOpenPhotoDialogPressed} className="photo-renderer__icon">add_a_photo</Icon>
        <Typography variant="caption" display="block" gutterBottom>
          {intl.get('photoRenderer.infoText')}
        </Typography>
        {this.renderAddPhotoDialog()}
        <div className="photo-renderer__output">
          <div>{this.renderPhotos()}</div>
        </div>
        {this.renderAlertDialog()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentFindIndex: state.findNotification.currentFindIndex,
  finds: state.findNotification.finds
});

const mapDispatchToProps = (dispatch) => ({
  setFindSitePhotos: (photos, findIndex, imgIndex) => dispatch(setFindSitePhotos(photos, findIndex, imgIndex)),
  setFindPhotos: (photos, findIndex, imgIndex) => dispatch(setFindPhotos(photos, findIndex, imgIndex)),
  changeSnipperStatus: (status) => dispatch(changeSnipperStatus(status)),
  deletePhotos: (photoIds, currentFindIndex, photoIndex, photoType) => dispatch(deletePhotos(photoIds, currentFindIndex, photoIndex, photoType))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoRenderer);