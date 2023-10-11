import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";


function Map() {

  const center = { lat: 47.088025620072976, lng: 17.90839132557579 };


  const { isLoaded } = useJsApiLoader({
    //process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 
    channel: "beta",
    googleMapsApiKey: "AIzaSyC3KGXEiZLRsUKSyIYho8duz62jjY2LZOs",
    libraries: ["places"],
  });
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [markers, setMarkers] = useState([]);
  const [duration, setDuration] = useState("");
  const [waypoints, setWaypoints] = useState([])

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    let results = await directionsService.route({
      origin: originRef.current.value,
      //waypoints: waypoints,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    let FinalTime = '';
    let element = 0;
    /*for (let idxI = 0; idxI <= waypoints.length; idxI++) {
      //element += parseInt(results.routes[0].legs[idxI].duration.text)
      let splitted = results.routes[0].legs[idxI].duration.text.split(" ")
      if(splitted[1] === "hour"){
        element += parseInt(((splitted[0]) * 60))+parseInt(splitted[2])
      }else{
        element += parseInt(splitted[0])
      }
      //element += (results.routes[idxI].legs[0].duration.text);
    }*/
    if((parseInt(element) > 60)){
        FinalTime = ''+parseInt(element / 60)+' óra'+'  '+parseInt(element-(parseInt(element / 60)*60))+' perc'
    }
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    //results.routes[0].legs[0].duration.text
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onClick={(event) => {
            console.log(event)
            const newMarker = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            };
            setMarkers([...markers, newMarker]);
          }}
          onLoad={(map) => setMap(map)}
        >
          {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default Map;
