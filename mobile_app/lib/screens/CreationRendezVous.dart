import 'package:flutter/material.dart';
import 'package:date_field/date_field.dart';
import 'package:mobile_app/data/dataMethodes.dart';
import 'package:provider/provider.dart';
import 'package:mobile_app/data/AllData.dart';

class CreationRendezVous extends StatefulWidget {
  const CreationRendezVous({Key? key}) : super(key: key);

  @override
  State<CreationRendezVous> createState() => _CreationRendezVousState();
}



class _CreationRendezVousState extends State<CreationRendezVous>{



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
                Consumer<All_Data>(builder: (context, data, child) {
                  return Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                            child:SizedBox(
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
                                  data.setTitreNEvent(value);
                                },
                              ),
                            ),
                          ),
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: SizedBox(
                            width: 300,
                            child: TextField(
                              decoration: const InputDecoration(
                                border: OutlineInputBorder(),
                                labelText: 'Description',
                              ),
                              onChanged: (value) {
                                data.setDescrNEvent(value);
                              },
                            ),
                          ),
                        ),

                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: SizedBox(
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
                                data.setDateNEvent(value.day.toString() + value.month.toString() + value.year.toString());
                                data.setHeureNEvent(value.hour.toString());
                              },
                              selectedDate: null,
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(10.0),
                          child: SizedBox(
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
                                data.setLieuNEvent(value);
                              },
                            ),
                          ),
                        ),
                        ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
                          ),
                          onPressed: () {
                            data.createEvent(data.getTitreNEvent(), data.getDescrNEvent(), data.getDateNEvent(), data.getHeureNEvent(), data.getLieuNEvent(), data.getDataTokenAuth());
                            Navigator.pop(context);
                          },
                          child: const Text(
                            "Créer l'événement",
                            style: TextStyle(fontSize: 25),
                          ),
                        )
                      ],
                    );
                }),
              ],
            )
          ]
      )
    ),
  );
  }
}