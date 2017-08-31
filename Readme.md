<!-- partial-about.html -->

<div class="jumbotron text-center">
    <h1>About Citypedia</h1>

<p>We plan on building a city explorer app using Javascript technologies like the MEAN stack.</p>

<p>This app will be built on top of a mashup of data retrieved from various APIs like Twitter,
Facebook, Instagram and more for any city that the user wants to search.

<p>The user will be able to see what pictures the residents of a certain city are uploading or
what kind of weather the city will have on the dates they are planning on traveling there or
find areas of interest in the city and more.

<p>The app will have the following features and will use data from the following APIs:

<p>1) For weather info of the city:
    -> Open Weather Map API

<p>2) For areas of interest in the city:
    -> Google Maps API

<p>3) For personality and sentiment analysis of people in the city
    -> Twitter API
    -> Facebook API

<p>4) Pictures of the city
    -> Instagram API

<p>5) Hotels in the city:
    -> Expedia API

<p>6) General news about the city:
    -> New York Times API

<p>As we can see, this app would serve as a one stop shop for getting all information about any city
the user searches for.

<p>We are planning on doing this by mashing up data from these six different APIs and provide real-time data
to the users in a user friendly manner.

<p>Technologies we plan to use:</p>
<p>Front-End Framework: AngularJS</p>
<p>Back-End: NodeJS and ExpressJS</p>
<p>API Architecture: ReSTful</p>
</div>


Andy Frain API Documentation
============================
Base Production URL = https://wms.redi-trak.com/api/api.cfc

Base Stanging URL = https://stagwms.redi-trak.com/api/api.cfc

Login Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=login`

Request Method: `POST`

Function: Log in user based on the username and password provided

Input Parameters: userid and password

Cotent-Type: `application/json`

Example request payload:
```json
{"password": "egen123", "userid": "egen"}
```
Reponse Object:
```json
{
"response":
{
"data":
{
"role":3,"siteName":"Egen Test","accessToken":"070B4B08-D4AE-52AA-D074BB2E9F4D49EE","securityorganization":"","loginTime":"08\/30\/2017 11:12 AM","expireTime":240,"siteId":134,"securityname":"egen test"
},
"returnCode":200,
"isSuccess":true}
}
```

Get Shifts Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=getShifts`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Gets the Shift details for a user.

Input Parameters: siteid

Cotent-Type: `application/json`

Example request payload:
```json
{"siteid":"134"}
```
Reponse Object:
```json
{"data":[{"status":1,"shiftid":349,"siteid":134,"shiftname":"Morning"},{"status":1,"shiftid":350,"siteid":134,"shiftname":"Evening"},{"status":1,"shiftid":351,"siteid":134,"shiftname":"Night"}],"response":{"message":"success","status":200}}
```
Get Routes Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=getRouteList&siteid=134&pagenumber=0`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Gets the routes for a user based on the site the user is assigned to.

Query Parameters: siteid and pagenumber

Example query params: `siteid=134&pagenumber=0`

Reponse Object:

__Note: We get this response as a String, so will need to JSON parse the string)__

```
"[{"routename":"Three","description":"3 checkpoints","routeid":647,"shiftid":349,"siteid":134,"routestatus":1,"checkpoints":[{"checkpointname":"beacon 2963","checkpointid":2565},{"checkpointname":"beacon 2964","checkpointid":2566},{"checkpointname":"beacon 2965","checkpointid":2567}],"shiftname":"Morning"},{"routename":"Four","description":"all 4 checkpoints","routeid":648,"shiftid":349,"siteid":134,"routestatus":1,"checkpoints":[{"checkpointname":"beacon 2963","checkpointid":2565},{"checkpointname":"beacon 2965","checkpointid":2567},{"checkpointname":"beacon 2964","checkpointid":2566},{"checkpointname":"beacon 2966","checkpointid":2568}],"shiftname":"Morning"},{"routename":"test route","description":"4 checkpoints","routeid":600,"shiftid":349,"siteid":134,"routestatus":1,"checkpoints":[{"checkpointname":"beacon 2963","checkpointid":2565},{"checkpointname":"beacon 2964","checkpointid":2566},{"checkpointname":"beacon 2965","checkpointid":2567},{"checkpointname":"beacon 2966","checkpointid":2568}],"shiftname":"Morning"}]"
```

Important points in response object:

-> We get the Route IDs and Route Names for the user

-> We get the Checkpoint IDs and Checkpoint Names of the checkpoints for each route. We will use this to find out the correct beacons for a route

Add Incidents Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=addIncident`

Request Method: `Multipart`

Content-Type: `multipart/mixed` (need to confirm)

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Add a new incident as posted by the user

Input Parameters: Params (Type: HashMap<String, String>) and Image file (Type: File object)

Params Example:

```
0 = {HashMap$HashMapEntry@5999} "imagetype" -> "jpg"
1 = {HashMap$HashMapEntry@6000} "incidentPriority" -> "2"	// Note: High -> 2, Medium -> 1, Low -> 0
2 = {HashMap$HashMapEntry@6001} "incidentDescription" -> "Test Description 1"
3 = {HashMap$HashMapEntry@6002} "routeId" -> "0"
4 = {HashMap$HashMapEntry@6003} "siteid" -> "134"
5 = {HashMap$HashMapEntry@6004} "incidentTime" -> "2017-08-30 11:54:39"
6 = {HashMap$HashMapEntry@6005} "incidentLocation" -> "Test Location 1"
```

__Note: The Image File is the File object of the image as stored on the device__

Example Image File Path: `/storage/emulated/0/Android/data/com.fraintech.wms.app/incidentImage/IncidentImage_1504112049318.jpg`

Reponse Object:

__Note: We get a String response__

```
"{"response":{"message":"success","status":200}}"
```

Clock In and Clock Out Endpoint
============
### Case 1: Clock In
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=doClockPunch`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Clocks in the user for the site for a route

Input Parameters: siteid, type (clockin or clockout - in this case it'll be clockin) and route id

Cotent-Type: `application/json`

Example request payload:

```json
{"siteid":"134","type":"clockin","routeid":"600"}
```

Reponse Object:

```json
{"response":{"message":"","success":true}}
```

### Case 2: Clock Out
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=doClockPunch`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Clocks out the user for the site for a route

Input Parameters: siteid, type (clockin or clockout - in this case it'll be clockout) and route id

Cotent-Type: `application/json`

Example request payload:

```json
{"siteid":"134","type":"clockout","routeid":"600"}
```
Reponse Object:

```json
{"response":{"message":"","success":true}}
```

Get Checkpoints List Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=getCheckpointList`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Get information about all the beacons for a site

Input Parameters: siteid & pagenumber

Cotent-Type: `application/json`

Example request payload:

```json
{"siteid":"134","pageNumber":"0"}
```
Reponse Object:

```json
{"meta":{"totalResults":4,"start":1,"end":4},"data":[{"minorid":43592,"status":1,"beaconid":2963,"majorid":26251,"routeId":[600,647,648],"checkpointname":"beacon 2963","checkpointid":2565,"alertMessage":"Checkpoint","siteID":134},{"minorid":32843,"status":1,"beaconid":2964,"majorid":11392,"routeId":[600,647,648],"checkpointname":"beacon 2964","checkpointid":2566,"alertMessage":"Checkpoint","siteID":134},{"minorid":18060,"status":1,"beaconid":2965,"majorid":19444,"routeId":[600,647,648],"checkpointname":"beacon 2965","checkpointid":2567,"alertMessage":"Checkpoint","siteID":134},{"minorid":17597,"status":1,"beaconid":2966,"majorid":46503,"routeId":[600,648],"checkpointname":"beacon 2966","checkpointid":2568,"alertMessage":"four","siteID":134}],"response":{"message":"","success":true}}
```

-> In the above response, we get the information of beacons that are installed at the site.

-> We get which checkpoint corresponds to which beacon (majorid and minorid). In this way, we can know if a beacon is assosciated with that checkpoint.

-> Also, we get the alert message to show when a beacon is hit.

-> We also get all the route ids (routeId array) for that site

Get Incidents Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=getincidents&pageNumber=0`

Request Method: `GET`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Get all the incidents posted by the user

Query Parameters: pageNumber

Example query parameter:

`&pageNumber=0`

Reponse Object:

__Note: We get a String response__

```
"{"meta":{"totalResults":20,"start":1,"end":20},"data":[{"incidentImageURL":"https://wms.redi-trak.com/API/api.cfc?method=renderasset&asset=IncidentImage_1504112049318.jpg","incidentTime":"August, 30 2017 12:04:30","incidentLocation":"Test Location 1","incidentDescription":"Test Description 1"},{"incidentImageURL":"https://wms.redi-trak.com/API/api.cfc?method=renderasset&asset=IncidentImage_15036130283840.jpg","incidentTime":"August, 24 2017 17:18:07","incidentLocation":"test123","incidentDescription":"test123"}]}"
```

We get an array of incident objects for that user

Each object has:

-> The image url where the image is saved on the server

-> Other incident related information

Get Checkpoint Access List Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=getCheckpointAccessInfo`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Get the checkpoints that have been hit for a route

Input Parameters: siteid & routeid

Cotent-Type: `application/json`

Example request payload:

```json
{"siteid":"134","routeid":"600"}
```

Reponse Object:

```json
{"data":[{"checkpointStatus":0,"CheckPointName":"beacon 2963","CheckPointID":2565,"AlertMessage":"Checkpoint"},{"checkpointStatus":0,"CheckPointName":"beacon 2964","CheckPointID":2566,"AlertMessage":"Checkpoint"},{"checkpointStatus":0,"CheckPointName":"beacon 2965","CheckPointID":2567,"AlertMessage":"Checkpoint"},{"checkpointStatus":0,"CheckPointName":"beacon 2966","CheckPointID":2568,"AlertMessage":"four"}],"response":{"message":"success","status":200}}
```

-> The reponse returns which checkpoints have been hit. The "checkpointStatus" becomes "1" when a beacon is hit for that checkpoint

-> We will use this API to update the dashboard.

For e.g., in the reponse above, we can use the length of response to get the total checkpoints on that route. Also, if 3 objects have been hit ("checkpointStatus":1), then we will show 3 out total checkpoints have been hit.

-> This endpoint will also be used to update the "View Schedule" page.

__Note: This will only be used when the device is actively connected to the internet__

Get Checkpoints Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=checkpointReader`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Update the beacons that have been hit by the user

Example request payload:
__Note: We send the reuqest as a String in this request__

```
"[{"siteid":"134","routeid":"600","majorid":"26251","minorid":"43592","CheckInTime":"2017-08-30T17:38Z"},{"siteid":"134","routeid":"600","majorid":"46503","minorid":"17597","CheckInTime":"2017-08-30T17:38Z"},{"siteid":"134","routeid":"600","majorid":"11392","minorid":"32843","CheckInTime":"2017-08-30T17:38Z"}]"
```

-> We are sending the beacon hit information to the server to update the beacons that have been hit

Reponse Object:

```json
{"data":[{"checkpointID":2565,"AlertMessage":"Checkpoint"},{"checkpointID":2568,"AlertMessage":"four"},{"checkpointID":2566,"AlertMessage":"Checkpoint"}],"response":{"message":"","success":true}}
```

Emergency Contacts Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=getEmergencyContacts`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Get the emergency contacts for the current site

Request Params: siteid

Example request payload:

```json
{"siteid":"134"}
```

Reponse Object:

### In this case, the contact list is empty

```json
{"contactList":[],"siteName":"Egen Test","address":{"city":"Naperville","state":"IL"},"response":{"message":"Contact info list retrieved successfully.","success":true},"customerName":"Andy Frain Services"}
```

### Populated contact list

```json
{"contactList":[{"contactPersonId":87,"lastName":"Silvers","phone":3312085133,"firstName":"Aaron"}],"siteName":"AFS - Demo Kit #2 (GGP)","address":{"city":"Aurora","state":"IL"},"response":{"message":"Contact info list retrieved successfully.","success":true},"customerName":"Andy Frain Services"}
```

User Locations Endpoint
============
Endpoint: `https://wms.redi-trak.com/api/api.cfc?method=updateofficerlocation`

Request Method: `POST`

Request Header: `Authorization: egen@072B2066-D4AE-52AA-D07417EC03A53B99
// Format for authorization header is userid@accessToken`

Function: Post the location of the user

Example request payload:

```json
{"siteid":"134","lat":"41.802395","lng":"-88.1414911"}
```

-> We send the lat, lng and site id for the user

Reponse Object:

```json
{"response":{"message":"success","status":200}}
```
