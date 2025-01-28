---
title: Point-in-polygon with CARTO API
excerpt: >-
  Data events allow you to grab information about a point's location, i.e. which
  polygon the point lies in. This example illustrates how to set up two data
  events. Both take advantage of CARTO's querying ability through the SQL API.
  The first one uses a nearest neighbor query to find the nearest brewery. The
  second example pulls in the name of the neighborhood polygon in which the
  point is contained.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
**NOTE:** With the new [Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) feature, you will be able to perform these sorts of calculations without making a request to the CARTO API. [Check out this example.](https://docs.fulcrumapp.com/docs/validate-if-point-is-in-polygon)

These examples require having data stored in CARTO tables. If you are unsure of what the query should be returning, we recommend testing out example data:

`https://denverstartup.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20sanfran_neighborhoods%20where%20ST_Contains(the_geom,%20ST_GeomFromText(%27POINT(-122.4613380%2037.78048)%27,4326))`

which returns:

```json
{
	"rows": [{
		"cartodb_id": 801,
		"the_geom": "0106000020E61...",
		"the_geom_webmercator": "0106000020110F...",
		"restaurants": 147,
		"city": "San Francisco",
		"county": "San Francisco",
		"name": "Inner Richmond",
		"bike_park_count": 46,
		"bike_share_count": 0,
		"co_working": 0,
		"bus_stops": 131,
		"total": 324
	}]
}
```

Tip: To keep data private, you will want to use `&api={secret_api_key}` at the end of the URL

```js
function nearestBrewery() {
	var query = 'SELECT * FROM denver_breweries ORDER BY the_geom <-> ST_Transform(CDB_LatLng(' + LONGITUDE() + ',' + LATITUDE() + '),4326) LIMIT 60';

	var options = {
    url: 'https://denverstartup.carto.com/api/v2/sql',
    qs: {
      f: 'geojson',
      q: query
    }
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
      ALERT('Error with request: ' + error);
    } else {
      var data = JSON.parse(body);
      SETVALUE('nearest_brewery', data.rows[0].name);
    }
  });
}
ON('save-record', nearestBrewery);
ON('edit-record', nearestBrewery);
ON('click', 'nearest_brewery', nearestBrewery);

function identifyNeighborhood() {
	var query = "SELECT * FROM denver_neighborhoods WHERE ST_Contains(the_geom, ST_GeomFromText('POINT("+ LONGITUDE() + " " + LATITUDE()+ ")', 4326));"

	var options = {
    url: 'https://denverstartup.carto.com/api/v2/sql',
    qs: {
      f: 'geojson',
      q: query
    }
  };

  REQUEST(options, function(error, response, body) {
    if (error) {
      ALERT('Error with request: ' + error);
    } else {
      var data = JSON.parse(body);
      SETVALUE('neighborhood', data.rows[0].nbhd_name);
    }
  });
}
ON('save-record', identifyNeighborhood);
ON('edit-record', identifyNeighborhood);
ON('click', 'neighborhood', identifyNeighborhood);
```

**NOTE:** The [LATITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-latitude) and [LONGITUDE](https://docs.fulcrumapp.com/docs/calculations-ref-longitude) functions will only return values if a record's geometry type is set to `Point`, and there is a [location](https://help.fulcrumapp.com/en/articles/2440341-what-are-the-various-location-data-values-in-the-record-metadata) set. Unless you have [enabled Lines and Polygons](https://help.fulcrumapp.com/en/articles/8404186-how-to-enable-lines-and-polygons-on-an-app) for your app, the `Point` type will be the only available geometry type for records in the app.