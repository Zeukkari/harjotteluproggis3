# GraphQL-treenausta

https://www.digitraffic.fi/rautatieliikenne/#graphql

https://www.predic8.de/graphql-query-samples.htm

https://alligator.io/graphql/introduction-graphql-queries/

https://graphql.github.io/learn/queries/

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
