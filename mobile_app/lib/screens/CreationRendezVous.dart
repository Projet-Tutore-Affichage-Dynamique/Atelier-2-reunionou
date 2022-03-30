import 'package:flutter/material.dart';
import 'package:date_field/date_field.dart';
import 'package:mobile_app/data/dataMethodes.dart';
import 'package:mobile_app/screens/RendezVous.dart';

class CreationRendezVous extends StatefulWidget {
  const CreationRendezVous({Key? key}) : super(key: key);

  @override
  State<CreationRendezVous> createState() => _CreationRendezVousState();
}

class _CreationRendezVousState extends State<CreationRendezVous>{

  var titreNEvent = "";
  var descrNEvent = "";
  var dateNEvent;
  var heureNEvent;
  var lieuNEvent = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue,
        title: const Text('Page Creation Rendez vous'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Padding(
                  padding: EdgeInsets.all(10.0),
                  child: Text(
                    'Créer un nouvel événement',
                    style: TextStyle(fontSize: 30),
                    textAlign: TextAlign.center,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      SizedBox(
                        width: 300,
                        child: TextField(
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'Titre',
                            suffixText: '*',
                            suffixStyle: TextStyle(
                              color: Colors.red,
                            ),
                          ),
                          onChanged: (value) {
                            titreNEvent = value;
                          },
                        ),
                      ),
                      SizedBox(
                        width: 300,
                        child: TextField(
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'Description',
                          ),
                          onChanged: (value) {
                            descrNEvent = value;
                          },
                        ),
                      ),
                      SizedBox(
                        width: 300,
                        child: DateTimeField(
                          decoration: const InputDecoration(
                            hintStyle: TextStyle(color: Colors.black45),
                            errorStyle: TextStyle(color: Colors.redAccent),
                            border: OutlineInputBorder(),
                            suffixIcon: Icon(Icons.event_note),
                            labelText: 'Date et heure',
                            suffixText: '*',
                            suffixStyle: TextStyle(
                              color: Colors.red,
                            ),
                          ),
                          mode: DateTimeFieldPickerMode.dateAndTime,
                          onDateSelected: (DateTime value) {
                            dateNEvent = value.day + value.month + value.year;
                            heureNEvent = value.hour;
                          },
                          selectedDate: null,
                        ),
                      ),
                      SizedBox(
                        width: 300,
                        child: TextField(
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'Lieu',
                            suffixText: '*',
                            suffixStyle: TextStyle(
                              color: Colors.red,
                            ),
                          ),
                          onChanged: (value) {
                            lieuNEvent = value;
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
                  ),
                  onPressed: () {
                    setState(() {
                      DataMethodes().createEvent(titreNEvent,descrNEvent,dateNEvent,heureNEvent,lieuNEvent);
                    });
                    Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const RendezVous()),
                    );
                  },
                  child: const Text(
                    "Créer l'événement",
                    style: TextStyle(fontSize: 25),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}