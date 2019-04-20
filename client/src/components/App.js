import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from './Header'
import Search from './Search'
import Autosuggest from './AutosuggestInput'
import AutocompleteInput from './AutocompleteInput'
import ScrollableTabsButtonAuto from './ScrollableTabsButtonAuto'
import Table from './Table'
import LinearBuffer from './LinearBuffer'

const Placeholder = ({ children }) => (
  <div>
    <ScrollableTabsButtonAuto>
      <Table trains={[]} stations={[]} currentStation={null} type='' />
      <Table trains={[]} stations={[]} currentStation={null} type='' />
    </ScrollableTabsButtonAuto>
    {children}
  </div>
)

export default class App extends Component {
  constructor(props) {
    super(props)

    this.stations = []
    this.state = {
      searchVal: '',
      currentStation: null,
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch = station => {
    console.log('handleSearch', station, this.state)
    this.setState(state => ({
      currentStation: station.value,
    }))
  }

  render() {
    return (
      <div>
        <Header />

        <Query query={STATION_QUERY} pollInterval={30000}>
          {({ data, loading, error, refetch }) => {
            if (loading) {
              return <Placeholder />
            }

            if (data && data.viewer && data.viewer.stations !== undefined) {
              const stations = data.viewer.stations
              const suggestions = stations.map(item => ({
                label: item.stationName,
                value: item.stationShortCode,
              }))

              return (
                <Fragment>
                  {/**
                  <Search
                    handleSearch={this.handleSearch.bind(this)}
                    stations={stations}
                  />
                  <Autosuggest
                    handleSearch={this.handleSearch.bind(this)}
                    suggestions={suggestions}
                  />
                  */}
                  <AutocompleteInput
                    handleSearch={this.handleSearch.bind(this)}
                    suggestions={suggestions}
                  />
                  <Query
                    query={TRAIN_QUERY}
                    skip={!this.state.currentStation}
                    variables={{ station: this.state.currentStation }}
                  >
                    {({ data, loading, error, refetch }) => {
                      if (loading) {
                        return (
                          <Placeholder>
                            <LinearBuffer />
                          </Placeholder>
                        )
                      }

                      if (error) {
                        return (
                          <Placeholder>
                            <div className='flex w-100 h-100 items-center justify-center pt7'>
                              <div>An unexpected error occured.</div>
                            </div>
                          </Placeholder>
                        )
                      }

                      if (data == null) {
                        return <Placeholder />
                      }

                      const arrivingTrains = data.viewer.arrivingTrains
                      const departingTrains = data.viewer.departingTrains
                      return (
                        <ScrollableTabsButtonAuto>
                          <Table
                            trains={departingTrains}
                            stations={stations}
                            currentStation={this.state.currentStation}
                            type='DEPARTURE'
                          />
                          <Table
                            trains={arrivingTrains}
                            stations={stations}
                            currentStation={this.state.currentStation}
                            type='ARRIVAL'
                          />
                        </ScrollableTabsButtonAuto>
                      )
                    }}
                  </Query>
                  }
                </Fragment>
              )
            }
          }}
        </Query>
      </div>
    )
  }
}

export const TRAIN_QUERY = gql`
  query TrainQuery($station: String!) {
    viewer {
      arrivingTrains: getStationsTrainsUsingGET(
        station: $station
        arrived_trains: 0
        arriving_trains: 0
        departed_trains: 1
        departing_trains: 1
      ) {
        cancelled
        commuterLineID
        deleted
        departureDate
        operatorShortCode
        operatorUICCode
        runningCurrently
        trainCategory
        trainType
        trainNumber
        timetableType
        timeTableRows {
          actualTime
          cancelled
          commercialStop
          commercialTrack
          countryCode
          differenceInMinutes
          estimateSource
          liveEstimateTime
          scheduledTime
          stationShortCode
          stationUICCode
          trainStopping
          type
          unknownDelay
        }
      }
      departingTrains: getStationsTrainsUsingGET(
        station: $station
        arrived_trains: 1
        arriving_trains: 1
        departed_trains: 0
        departing_trains: 0
      ) {
        cancelled
        commuterLineID
        deleted
        departureDate
        operatorShortCode
        operatorUICCode
        runningCurrently
        trainCategory
        trainType
        trainNumber
        timetableType
        timeTableRows {
          actualTime
          cancelled
          commercialStop
          commercialTrack
          countryCode
          differenceInMinutes
          estimateSource
          liveEstimateTime
          scheduledTime
          stationShortCode
          stationUICCode
          trainStopping
          type
          unknownDelay
        }
      }
    }
  }
`
export const STATION_QUERY = gql`
  query StationQuery {
    viewer {
      stations: getStationsUsingGET(where: "[*passengerTraffic=true]") {
        stationName
        stationShortCode
      }
    }
  }
`
