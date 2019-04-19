import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from './Header'
import Search from './Search'
import TabContainer from './TabContainer'
import Table from './Table'

class Post extends Component {
  render() {
    let title = this.props.post.title
    if (this.props.isDraft) {
      title = `${title} (Draft)`
    }

    return (
      <div className='no-underline ma1' to={`/post/${this.props.post.id}`}>
        <h2 className='f3 black-80 fw4 lh-solid'>{title}</h2>
        <p className='black-80 fw3'>{this.props.post.content}</p>
      </div>
    )
  }
}

export default class FeedPage extends Component {
  render() {
    return (
      <Query query={FEED_QUERY} variables={{ station: 'HKI' }}>
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return (
              <div className='flex w-100 h-100 items-center justify-center pt7'>
                <div>Loading ...</div>
              </div>
            )
          }

          if (error) {
            return (
              <div className='flex w-100 h-100 items-center justify-center pt7'>
                <div>An unexpected error occured.</div>
              </div>
            )
          }

          return (
            <Fragment>
              <Header />
              <Search />
              <TabContainer>
                <Table />
                <Table />
              </TabContainer>

              {this.props.children}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      content
      title
      published
    }
  }
`

export const STATION_QUERY = gql`
  query StationQuery($station: String!) {
    viewer {
      getStationsTrainsUsingGET(station: "HKI") {
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
