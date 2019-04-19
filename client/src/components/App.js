import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from './Header'
import Search from './Search'
import TabContainer from './TabContainer'
import Table from './Table'

export default class App extends Component {
  state = { searchVal: 'HKI' }

  handleSearch = searchVal => this.setState(() => ({ searchVal }))

  render() {
    const variables = {
      station: this.state.searchVal,
    }
    return (
      <Query
        query={STATION_QUERY}
        variables={{ station: this.state.searchVal }}
      >
        {({ data, loading, error, refetch }) => {
          console.log(
            'data, loading, error, refetch',
            data,
            loading,
            error,
            refetch,
          )

          if (loading) {
            return (
              <div className='flex w-100 h-100 items-center justify-center pt7'>
                <div>Loading ...</div>
              </div>
            )
          }

          if (error) {
            console.log('error: ', error)
            return (
              <div className='flex w-100 h-100 items-center justify-center pt7'>
                <div>An unexpected error occured.</div>
              </div>
            )
          }

          console.log('data: ', data)
          const trains =
            (data && data.viewer && data.viewer.getStationsTrainsUsingGET) || []
          return (
            <Fragment>
              <Header />
              <Search handleSearch={this.handleSearch.bind(this)} />
              <TabContainer>
                <Table trains={trains} />
                <Table trains={trains} />
              </TabContainer>

              {this.props.children}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export const STATION_QUERY = gql`
  query StationQuery($station: String!) {
    viewer {
      getStationsTrainsUsingGET(station: $station) {
        cancelled
        commuterLineID
        departureDate
        timetableAcceptanceDate
        trainCategory
        trainNumber
        trainType
      }
    }
  }
`
