import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile_app/data/AllData.dart';
import 'package:mobile_app/screens/RendezVousDetail.dart';

class WidgetEvent extends StatefulWidget {
  final currentEvent;

  const WidgetEvent({Key? key, this.currentEvent}) : super(key: key);

  @override
  State<WidgetEvent> createState() => _WidgetEventState();
}

class _WidgetEventState extends State<WidgetEvent> {

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Consumer<All_Data>(builder: (context, data, child) {

          String currentTitre = "";
          String currentDescr = "";
          String currentDate = "";

          if (widget.currentEvent['titre'] != null){
            currentTitre = widget.currentEvent['titre'];
          }
          if (widget.currentEvent['description'] != null) {
            currentDescr = widget.currentEvent['description'];
          }
          if (widget.currentEvent['date'] != null) {
            currentDate = widget.currentEvent['date'];
          }

          return InkWell(
            child: Padding(
              padding: const EdgeInsets.all(10.0),
                child:Container(
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
                              currentTitre,
                              style: const TextStyle(fontSize: 20),
                              textAlign: TextAlign.center,
                            ),
                            if(currentDescr != "")...[
                              Text(
                                currentDescr,
                                style: const TextStyle(fontSize: 15),
                                textAlign: TextAlign.center,
                              ),
                            ],
                            Text(
                              currentDate,
                              style: const TextStyle(fontSize: 10),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
              ),
            onTap: () {
              setState(() {
                data.getEventDetails(widget.currentEvent['id'].toString(), data.getDataTokenAuth());
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => RendezVousDetail()),
                );
              });
            },
          );
        }),

      ],
    );
  }

}

