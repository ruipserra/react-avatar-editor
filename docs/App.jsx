import React from 'react'
import ReactAvatarEditor from '../src/index'
import Dropzone from 'react-dropzone'
import Preview from './Preview.jsx'

import AvatarImagePath from './avatar.jpg'

export default class App extends React.Component {
  state = {
    image: AvatarImagePath,
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 200,
    height: 200,
    disableCanvasRotation: false,
    isTransparent: false,
    backgroundColor: null
  }

  handleNewImage = (e) => {
    this.setState({ image: e.target.files[0] })
  }

  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()

    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
      },
    })
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ allowZoomOut })
  }

  handleDisableCanvasRotation = ({
    target: { checked: disableCanvasRotation },
  }) => {
    this.setState({ disableCanvasRotation })
  }

  rotateScale = (e) => {
    const scale = parseFloat(e.target.value)
    e.preventDefault()
    this.setState({
      rotate: scale,
    })
  }

  rotateLeft = (e) => {
    e.preventDefault()

    this.setState({
      rotate: (this.state.rotate - 90) % 360 ,
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: (this.state.rotate + 90) % 360 ,
    })
  }

  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value)
    this.setState({ borderRadius })
  }

  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }

  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }

  handleWidth = (e) => {
    const width = parseInt(e.target.value)
    this.setState({ width })
  }

  handleHeight = (e) => {
    const height = parseInt(e.target.value)
    this.setState({ height })
  }

  logCallback(e) {
    // eslint-disable-next-line no-console
    console.log('callback', e)
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }

  handlePositionChange = (position) => {
    this.setState({ position })
  }

  setBackgroundColor = (e) => {
    this.setState({ backgroundColor: e.target.value })
  }

  setTransparent = (e) => {
    const isTransparent = e.target.checked;
    // set color to white initially
    const backgroundColor = isTransparent ? '#FFFFFF' : null
    
    this.setState({ backgroundColor, isTransparent })
  }

  render() {
    return (
      <div>
        <Dropzone
          onDrop={(acceptedFiles) => {
            this.setState({ image: acceptedFiles[0] })
          }}
          noClick
          multiple={false}
          style={{
            width: this.state.width,
            height: this.state.height,
            marginBottom: '35px',
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <ReactAvatarEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                width={this.state.width}
                height={this.state.height}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={
                  this.state.width / (100 / this.state.borderRadius)
                }
                backgroundColor={this.state.backgroundColor}
                onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                onImageReady={this.logCallback.bind(this, 'onImageReady')}
                image={this.state.image}
                className="editor-canvas"
                disableCanvasRotation={this.state.disableCanvasRotation}
              />
              <br />
              New File:
              <input
                name="newImage"
                type="file"
                onChange={this.handleNewImage}
                {...getInputProps()}
                style={{ display: 'initial' }}
              />
            </div>
          )}
        </Dropzone>
        <br />
        Zoom:
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min={this.state.allowZoomOut ? '0.1' : '1'}
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        {'Allow Scale < 1'}
        <input
          name="allowZoomOut"
          type="checkbox"
          onChange={this.handleAllowZoomOut}
          checked={this.state.allowZoomOut}
        />
        <br />
        Border radius:
        <input
          name="scale"
          type="range"
          onChange={this.handleBorderRadius}
          min="0"
          max="50"
          step="1"
          defaultValue="0"
        />
        <br />
        Avatar Width:
        <input
          name="width"
          type="number"
          onChange={this.handleWidth}
          min="50"
          max="400"
          step="10"
          value={this.state.width}
        />
        <br />
        Avatar Height:
        <input
          name="height"
          type="number"
          onChange={this.handleHeight}
          min="50"
          max="400"
          step="10"
          value={this.state.height}
        />
        <br />
        X Position:
        <input
          name="scale"
          type="range"
          onChange={this.handleXPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.x}
        />
        <br />
        Y Position:
        <input
          name="scale"
          type="range"
          onChange={this.handleYPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.y}
        />
        <br />
        Rotate:
        <button onClick={this.rotateLeft}>Left</button>
        <button onClick={this.rotateRight}>Right</button>
        <br />
        Disable Canvas Rotation
        <input
          name="disableCanvasRotation"
          type="checkbox"
          onChange={this.handleDisableCanvasRotation}
          checked={this.state.disableCanvasRotation}
        />
        <br />
        Rotation Scale:
        <input
          name="scale"
          type="range"
          onChange={this.rotateScale}
          min="0"
          max="180"
          step="1"
          defaultValue="0"
        />
        <br />
        Transparent image?
        <input type="checkbox" onChange={this.setTransparent} defaultChecked={this.state.isTransparent}></input>
        <br />
        {this.state.isTransparent && <div style={{ marginLeft: '1rem' }}>
          Background color: 
          <input
            name="backgroundColor"
            type="color"
            defaultValue={this.state.backgroundColor}
            onChange={this.setBackgroundColor}
          />
          <br />
        </div>}
        <br />
        <input type="button" onClick={this.handleSave} value="Preview" />
        <br />
        {!!this.state.preview && (
          <img
            src={this.state.preview.img}
            style={{
              borderRadius: `${
                (Math.min(this.state.preview.height, this.state.preview.width) +
                  10) *
                (this.state.preview.borderRadius / 2 / 100)
              }px`,
            }}
          />
        )}
        {!!this.state.preview && (
          <Preview
            width={
              this.state.preview.scale < 1
                ? this.state.preview.width
                : (this.state.preview.height * 478) / 270
            }
            height={this.state.preview.height}
            image="avatar.jpg"
            rect={this.state.preview.rect}
          />
        )}
      </div>
    )
  }
}
