import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile_app/data/dataMethodes.dart';
import 'package:mobile_app/screens/CreationRendezVous.dart';
import 'package:mobile_app/screens/RendezVousDetail.dart';

class RendezVous extends StatefulWidget {
  const RendezVous({Key? key}) : super(key: key);

  @override
  State<RendezVous> createState() => _RendezVousState();
}

class _RendezVousState extends State<RendezVous>{

  final List<Widget> _eventsList = [];

  Widget _event(i) {
    var currentTitre = "";
    var currentDescr = "";
    var currentDate = "";
    if(dataEventList[i]['titre'] != null){
      currentTitre = dataEventList[i]['titre'];
    }
    if(dataEventList[i]['description'] != null){
      currentDescr = dataEventList[i]['description'];
    }
    if(dataEventList[i]['date'] != null){
      currentDate = dataEventList[i]['date'];
    }
    return InkWell(
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: SizedBox(
            width: 300,
            child: Column(
              children: [
                Text(
                  'titre'+ currentTitre,
                  style: const TextStyle(fontSize: 20),
                  textAlign: TextAlign.center,
                ),
                Text(
                  'description'+ currentDescr,
                  style: const TextStyle(fontSize: 15),
                  textAlign: TextAlign.center,
                ),
                Text(
                  'date'+ currentDate,
                  style: const TextStyle(fontSize: 10),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
      onTap: () {
        DataMethodes().getEventDetails(dataEventList[i]['id']);
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => RendezVousDetail(dataEventList[i]['id'])),
        );
      },
    );
  }

  void _addAllEvents() {
    setState(() {
      for (var i=0; i < dataEventList.length; i++){
        _eventsList.add(_event(i));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    _addAllEvents();
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Page Rendez vous'),
      ),
      body: Center(
        child: Column(
          children: [
            Container(
              alignment: Alignment.topCenter,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: SizedBox(
                  child: Column(
                    children: [
                      const Text(
                        'Mes événements',
                        style: TextStyle(fontSize: 40),
                        textAlign: TextAlign.center,
                      ),
                      ElevatedButton(
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
                        ),
                        onPressed: () {
                          Navigator.pop(context);
                          setState(() {});
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const CreationRendezVous()),
                          );
                        },
                        child: const Text(
                          'Créer un événement',
                          style: TextStyle(fontSize: 25),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.fromLTRB(10, 0, 10, 10),
              child: Text(
                'Ils arrivent bientôt',
                style: TextStyle(fontSize: 30),
                textAlign: TextAlign.center,
              ),
            ),
            Column(
              children: _eventsList,
            ),
          ],
        ),
      ),
    );
  }
}