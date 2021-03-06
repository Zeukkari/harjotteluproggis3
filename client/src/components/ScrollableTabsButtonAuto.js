import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabContainer from './TabContainer'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes, children } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='inherit'
            variant='scrollable'
            scrollButtons='auto'
          >
            <Tab label='Lähtevät' />
            <Tab label='Saapuvat' />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>{children[0]}</TabContainer>}
        {value === 1 && <TabContainer>{children[1]}</TabContainer>}
      </div>
    )
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ScrollableTabsButtonAuto)
