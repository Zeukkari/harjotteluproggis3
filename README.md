# GraphQL-treenausta

https://devhints.io/graphql

https://www.digitraffic.fi/rautatieliikenne/#graphql

https://www.predic8.de/graphql-query-samples.htm

https://alligator.io/graphql/introduction-graphql-queries/

https://graphql.github.io/learn/queries/

https://blog.hashvel.com/posts/learn-graphql-query-alias-fragments-variables-directives-with-examples/


## Testiqueryjä

```
{
  viewer {
    getStationsTrainsUsingGET(station: "HKI") {
      trainNumber
      operatorShortCode
    }
  }
}

```

```
{
  viewer {
    getStationsUsingGET {
      stationName
      stationShortCode
      stationUICCode
    }
  }
}
```

```
{
  viewer {
    getCompositionsByVersionUsingGET {
      departureDate
      trainCategory
      trainNumber
      trainType
      journeySections {
        beginTimeTableRow {
          scheduledTime
          stationShortCode
          type
        }
        endTimeTableRow {
          scheduledTime
          stationShortCode
          type
        }
      }
    }
  }
}

```



```
{
  viewer {
    getTrainsByDepartureDateUsingGET(departure_date: "2017-12-28") {
      cancelled
      commuterLineID
      deleted
      operatorShortCode
    }
    getCompositionByTrainNumberAndDepartureDateUsingGET(train_number: "1", departure_date: "2017-12-28") {
      departureDate
      journeySections{
        beginTimeTableRow {
          scheduledTime
          stationShortCode
          stationUICCode
        }
        endTimeTableRow {
          scheduledTime
          stationShortCode
          stationUICCode
        }
      }
      operatorShortCode
      operatorUICCode
      trainCategory
      trainType
      version
    }
  }
}

```

```
{
  viewer {
    query1: getStationsTrainsUsingGET(station: "HKI") {
      trainNumber
      operatorShortCode
    }
    
    query2: getStationsTrainsUsingGET(station: "HKI", where:"[*commuterLineID=U]") {
      trainNumber
      commuterLineID
    }
    
    getStationsTrainsUsingGET(station: "HKI", where:"[*][0]") {
      trainNumber
      operatorShortCode
    }
    
    getTrainsByDepartureDateUsingGET(departure_date: "2017-12-28") {
      cancelled
      commuterLineID
      deleted
      operatorShortCode
    }
    getCompositionByTrainNumberAndDepartureDateUsingGET(train_number: "1", departure_date: "2017-12-28") {
      departureDate
      journeySections{
        beginTimeTableRow {
          scheduledTime
          stationShortCode
          stationUICCode
        }
        endTimeTableRow {
          scheduledTime
          stationShortCode
          stationUICCode
        }
      }
      operatorShortCode
      operatorUICCode
      trainCategory
      trainType
      version
    }

  }

  
}
```

