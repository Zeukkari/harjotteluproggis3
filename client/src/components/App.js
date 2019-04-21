import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import AutocompleteInput from './AutocompleteInput'
import ScrollableTabsButtonAuto from './ScrollableTabsButtonAuto'
import Table from './EnhancedTable'
import LinearBuffer from './LinearBuffer'
import Layout from './Layout'

const Placeholder = ({ children }) => (
  <div>
    <ScrollableTabsButtonAuto>
      {children}
      <Table trains={[]} stations={[]} currentStation={null} type='' />
      <Table trains={[]} stations={[]} currentStation={null} type='' />
    </ScrollableTabsButtonAuto>
  </div>
)

function mapStation(stations, stationCode) {
  if (stations.find === undefined) return 'stations were missing'
  const lookUp = stations.find(item => item.stationShortCode === stationCode)
  if (lookUp) return lookUp.stationName
  else return ''
}

function processQueryResultItem(result, currentStation, stations, type) {
  const timeTable = result.timeTableRows
  const startStation = mapStation(stations, timeTable[0].stationShortCode)
  const endStation = mapStation(stations, timeTable[0].stationShortCode)
  const currentStationTimeTable = timeTable.filter(item => {
    return item.stationShortCode === currentStation
  })
  const arrivalTime = currentStationTimeTable.find(
    item => item.type === 'ARRIVAL',
  )
  const departureTime = currentStationTimeTable.find(
    item => item.type === 'DEPARTURE',
  )

  let formattedArrivalTime = ''
  if (arrivalTime) {
    formattedArrivalTime =
      arrivalTime.liveEstimateTime ||
      arrivalTime.actualTime ||
      arrivalTime.scheduledTime
  }

  let formattedDepartureTime = ''
  if (departureTime) {
    formattedDepartureTime =
      departureTime.liveEstimateTime ||
      departureTime.actualTime ||
      departureTime.scheduledTime
  }
  formattedDepartureTime = moment(formattedDepartureTime).format('hh:mm:ss')
  formattedArrivalTime = moment(formattedArrivalTime).format('hh:mm:ss')

  const sortTime =
    type === 'ARRIVAL' ? formattedArrivalTime : formattedDepartureTime

  return {
    cancelled: result.cancelled,
    commuterLineID: result.commuterLineID,
    trainNumber: result.trainNumber,
    startStation: startStation,
    endStation: endStation,
    arrivalTime: formattedArrivalTime,
    departureTime: formattedDepartureTime,
    arrivalTimeDetails: arrivalTime,
    departureTimeDetails: departureTime,
    currentStationTimeTable: currentStationTimeTable,
    sortTime: sortTime,
  }
}

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
    this.setState(state => ({
      currentStation: station.value,
    }))
  }

  render() {
    return (
      <Layout>
        <Query query={STATION_QUERY} pollInterval={30000}>
          {({ data, loading, error, refetch }) => {
            if (loading) {
              return (
                <Placeholder>
                  <LinearBuffer />
                </Placeholder>
              )
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
                    handleSearch={this.handleSearch}
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
                            <div>An unexpected error occured.</div>
                            <LinearBuffer />
                          </Placeholder>
                        )
                      }
                      if (data == null) {
                        return (
                          <ScrollableTabsButtonAuto>
                            <Table
                              trains={[]}
                              currentStation={this.state.currentStation}
                              type='DEPARTURE'
                            />
                            <Table
                              trains={[]}
                              currentStation={this.state.currentStation}
                              type='ARRIVAL'
                            />
                          </ScrollableTabsButtonAuto>
                        )
                      }

                      let arrivingTrains = data.data.arrivingTrains.map(item =>
                        processQueryResultItem(
                          item,
                          this.state.currentStation,
                          stations,
                          'ARRIVAL',
                        ),
                      )
                      arrivingTrains = arrivingTrains.filter(
                        train => train.arrivalTime !== undefined,
                      )

                      let departingTrains = data.data.departingTrains.map(
                        item =>
                          processQueryResultItem(
                            item,
                            this.state.currentStation,
                            stations,
                            'DEPARTURE',
                          ),
                      )
                      departingTrains = departingTrains.filter(
                        train => train.departureTime !== undefined,
                      )
                      departingTrains = departingTrains.filter(
                        train => train.arrivalTime !== undefined,
                      )

                      return (
                        <ScrollableTabsButtonAuto>
                          <Table
                            trains={departingTrains}
                            currentStation={this.state.currentStation}
                            type='DEPARTURE'
                          />
                          <Table
                            trains={arrivingTrains}
                            currentStation={this.state.currentStation}
                            type='ARRIVAL'
                          />
                        </ScrollableTabsButtonAuto>
                      )
                    }}
                  </Query>
                </Fragment>
              )
            }
          }}
        </Query>
      </Layout>
    )
  }
}

export const TRAIN_QUERY = gql`
  query TrainQuery($station: String = "HKI") {
    data: viewer {
      arrivingTrains: getStationsTrainsUsingGET(station: $station) {
        ...TrainInfo
      }
      departingTrains: getStationsTrainsUsingGET(station: $station) {
        ...TrainInfo
      }
    }
  }

  fragment TrainInfo on getStationsTrainsUsingGET_items {
    cancelled
    commuterLineID
    trainNumber
    timeTableRows {
      actualTime
      cancelled
      liveEstimateTime
      scheduledTime
      stationShortCode
      type
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
