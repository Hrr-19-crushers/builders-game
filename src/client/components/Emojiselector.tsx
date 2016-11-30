var React = require('react');
var EmojiPicker = require('emoji-picker');
var emojiMap = require ('react-emoji-picker/lib/emojiMap');

// styles for the emoji picker wrapper
var emojiPickerStyles = {
  position: 'absolute',
  left: 0, top: '3.9rem',
  backgroundColor: 'white',
  width: '100%',
  padding: '.3em .6em',
  border: '1px solid #0074d9',
  borderTop: 'none',
  zIndex: '2'
};

var MyEmojiInput = React.createClass({
  getInitialState: function() {
    return {
      emoji: null,
      showEmojiPicker: false,
    }
  },

  componentDidMount: function() {
    document.addEventListener('click', this.toggleEmojiPicker, false)
  },

  componentWillUnmount: function() {
    document.removeEventListener('click', this.toggleEmojiPicker, false)
  },

  toggleEmojiPicker: function(e) {
    if(this.refs.emoji.contains(e.target)) {
      this.setState({showEmojiPicker: true});
    } else {
      setTimeout(this.validateEmoji, 10)
      this.setState({showEmojiPicker: false});
    }
  },

  validateEmoji: function() {
    var matched = emojiMap.filter(function(emoji) {
      return `:${emoji.name}:` === this.state.emoji
    })

    if(matched.length === 0) {
      this.setState({emoji: null})
    }
  },

  updateState: function(e) {
    this.setState({emoji: e.target.value})
  },

  setEmoji: function(emoji) {
    this.setState({emoji: emoji})
  },

  // allows selecting first emoji by pressing "Enter" without submitting form
  grabKeyPress: function(e) {
    if(e.keyCode === 13) {
      e.preventDefault()
    }
  },

  emojiPicker: function() {
    if(this.state.showEmojiPicker) {
      return (
        <EmojiPicker
          style={emojiPickerStyles} onSelect={this.setEmoji}
          query={this.state.emoji}
        />
      )
    }
  },

  render: function() {
    return (
      <p ref="emoji">
        <label htmlFor="emoji">Emoji</label>
        <input name="emoji" id="emoji" value={this.state.emoji} autoComplete="off"
          type={this.state.showEmojiPicker ? "search" : "text"}
          onChange={this.updateState} onKeyDown={this.grabKeyPress}/>
        {this.emojiPicker()}
      </p>
    )
  }
})

export default MyEmojiInput
