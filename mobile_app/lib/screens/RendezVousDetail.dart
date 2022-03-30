import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobile_app/data/AllData.dart';
import 'package:provider/provider.dart';

class RendezVousDetail extends StatefulWidget {
  RendezVousDetail({Key? key}) : super(key: key);

  @override
  State<RendezVousDetail> createState() => _RendezVousDetailState();
}

class _RendezVousDetailState extends State<RendezVousDetail> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Page Rendez vous'),
      ),
      body: Center(
        child: Consumer<All_Data>(builder: (context, data, child) {

          Map<String, dynamic> currentEvent = data.getDataEventDetails();
          String currentTitre = "";
          String currentDescr = "";
          String currentDate = "";

          if (currentEvent['titre'] != null){
            currentTitre = currentEvent['titre'];
          }
          if (currentEvent['description'] != null) {
            currentDescr = currentEvent['description'];
          }
          if (currentEvent['date_RV'] != null) {
            currentDate = currentEvent['date_RV'];
          }
          return Column(
            children: [
              Padding(
                  padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
                  child: Text(
                    currentTitre,
                    style: const TextStyle(fontSize: 40),
                    textAlign: TextAlign.center,
                  ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
                child: Text(
                  currentDate.substring(0,10) + ' ' + currentDate.substring(11,19),
                  style: const TextStyle(fontSize: 30),
                  textAlign: TextAlign.center,
                ),
              ),
              if(currentDescr != "")...[
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
                  child: Text(
                    currentDescr,
                    style: const TextStyle(fontSize: 25),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
              const Padding(
                padding: EdgeInsets.fromLTRB(0, 5, 0, 5),
                child: GoogleMap(
                  mapType: MapType.hybrid,
                  initialCameraPosition: CameraPosition(
                    target: LatLng(48.68345313301569, 6.161524569309479),
                    zoom: 10,
                  ),
                ),
              )
            ],
          );
        })
      ),
    );
  }
}



