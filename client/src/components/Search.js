import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}

class CustomizedInputBase extends Component {
  state = { searchVal: 'null' }

  handleChange(event) {
    this.setState({ searchVal: event.target.value })
  }

  render() {
    const { handleSearch, classes } = this.props
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          className={classes.input}
          placeholder='Hae aseman nimellä'
          onChange={this.handleChange.bind(this)}
        />
        <IconButton
          className={classes.iconButton}
          aria-label='Search'
          onClick={() => handleSearch(this.state.searchVal)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    )
  }
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomizedInputBase)
