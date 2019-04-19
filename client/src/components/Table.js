import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EnhancedTableHead from './TableHead'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
})

const mapStation = (stations, stationCode) => {
  if (stations.find === undefined) return '(missing)'
  const lookUp = stations.find(item => item.stationShortCode === stationCode)
  if (lookUp) return lookUp.stationName
  else return '(missing)'
}

class EnhancedTable extends React.Component {
  render() {
    const { trains, stations, currentStation, type, classes } = this.props
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle'>
            <EnhancedTableHead type={type} currentStation={currentStation} />
            <TableBody>
              {trains.map(train => {
                const trainLabel =
                  train.commuterLineID ||
                  `${train.trainType} ${train.trainNumber}`
                const startStationCode = train.timeTableRows[0].stationShortCode
                const endStationCode =
                  train.timeTableRows[train.timeTableRows.length - 1]
                    .stationShortCode

                const startStation = mapStation(stations, startStationCode)
                const endStation = mapStation(stations, endStationCode)

                const timeInfo = train.timeTableRows.find(tableRow => {
                  return (
                    (tableRow.stationShortCode === currentStation &&
                      tableRow.type === type) ||
                    {}
                  )
                })
                const timeField =
                  timeInfo.actualTime || timeInfo.scheduledTime || 'missing'
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={`${train.trainNumber}-${timeField}`}
                  >
                    <TableCell align='center'>{trainLabel}</TableCell>
                    <TableCell align='center'>{startStation} </TableCell>
                    <TableCell align='center'> {endStation} </TableCell>
                    <TableCell align='center'>{timeField} </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
}
EnhancedTable.defaultProps = {
  trains: [],
}

export default withStyles(styles)(EnhancedTable)
