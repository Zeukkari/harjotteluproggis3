import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const CustomTableCell = withStyles(theme => ({
  root: {
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
      fontSize: '0.05rem',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: '0.3em',
  },
  body: {
    fontSize: '0.3em',
  },
}))(TableCell)

const styles = theme => ({
  root: {},
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
})

let id = 0
function createData(name, calories, fat, carbs, protein) {
  id += 1
  return { id, name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

function CustomizedTable(props) {
  const { classes } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Dessert (100g serving)</CustomTableCell>
            <CustomTableCell align='right'>Calories</CustomTableCell>
            <CustomTableCell align='right'>Fat (g)</CustomTableCell>
            <CustomTableCell align='right'>Carbs (g)</CustomTableCell>
            <CustomTableCell align='right'>Protein (g)</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component='th' scope='row'>
                {row.name}
              </CustomTableCell>
              <CustomTableCell align='right'>{row.calories}</CustomTableCell>
              <CustomTableCell align='right'>{row.fat}</CustomTableCell>
              <CustomTableCell align='right'>{row.carbs}</CustomTableCell>
              <CustomTableCell align='right'>{row.protein}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomizedTable)
