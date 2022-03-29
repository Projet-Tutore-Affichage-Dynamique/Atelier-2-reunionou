import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class RendezVousDetail extends StatefulWidget {
  const RendezVousDetail(id, {Key? key}) : super(key: key);

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
        child: Column(
          children: const [
            Text(
              'titre',
              style: TextStyle(fontSize: 40),
              textAlign: TextAlign.center,
            ),
            Text(
              'date',
              style: TextStyle(fontSize: 40),
              textAlign: TextAlign.center,
            ),
            Text(
              'descr',
              style: TextStyle(fontSize: 20),
              textAlign: TextAlign.center,
            ),
            SizedBox(
              height: 100,
              width: 100,
              child: GoogleMap(
                  initialCameraPosition: CameraPosition(
                      target: LatLng(0, 0),
                  ),
              ),
            ),
            //Bouton acces page message
          ],
        ),
      ),
    );
  }
}



