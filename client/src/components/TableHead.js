import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class EnhancedTableHead extends React.Component {
  render() {
    const { type } = this.props
    const dateLabel = type === 'ARRIVING' ? 'saapuvat' : 'lähtevät'
    const rows = [
      { id: 'train', numeric: false, label: 'Juna' },
      {
        id: 'fromStation',
        numeric: false,
        label: 'Lähtöasema',
      },
      {
        id: 'toStation',
        numeric: false,
        label: 'Pääteasema',
      },
      {
        id: 'dateTime',
        numeric: false,
        label: dateLabel,
      },
    ]

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell key={row.id} align='center'>
                {row.label}
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    )
  }
}

export default EnhancedTableHead
