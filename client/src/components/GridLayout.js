import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CustomTable from './CustomTable'
import Header from './Header'

const styles = theme => ({
  root: {
    flexGrow: 1,
    typography: { useNextVariants: true },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
})

class GuttersGrid extends React.Component {
  state = {
    spacing: '16',
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    })
  }

  render() {
    const { classes, children } = this.props
    const { spacing } = this.state

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <main>
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>{children}</div>
            </div>
          </main>
        </Grid>
        <Grid item xs={12}>
          <footer className={classes.footer}>
            <Typography
              variant='subtitle1'
              align='center'
              color='textSecondary'
              component='p'
            >
              Rataopas
            </Typography>
          </footer>
        </Grid>
      </Grid>
    )
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GuttersGrid)
