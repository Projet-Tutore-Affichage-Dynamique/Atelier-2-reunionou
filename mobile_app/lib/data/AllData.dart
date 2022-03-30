import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:mobile_app/models/connexion.dart';
import 'package:mobile_app/models/events.dart';
import 'package:mobile_app/models/eventDetail.dart';
import 'package:mobile_app/models/widgetEvent.dart';

var ip = "51.210.15.53:8082";

class All_Data extends ChangeNotifier{

  String? dataId;
  String? dataMdp;
  String? dataTokenAuth;
  List<dynamic> dataEventList = [];
  Map<String, dynamic> dataEventDetails = {};
  Map<String, dynamic> dataEventCreated = {};
  List<Widget> eventsList = [];
  String? titreNEvent;
  String? descrNEvent;
  String? dateNEvent;
  String? heureNEvent;
  String? lieuNEvent ;

  String? getDataId() => dataId;
  void setDataId(newId) => dataId = newId;

  String? getDataMdp() => dataMdp;
  void setDataMdp(newMdp) => dataMdp = newMdp;

  String? getDataTokenAuth() => dataTokenAuth;
  void setDataTokenAuth(newToken) => dataTokenAuth = newToken;

  List<dynamic>? getDataEventList() => dataEventList;
  void setDataEventList(newList) => dataEventList = newList;

  Map<String, dynamic> getDataEventDetails() => dataEventDetails;
  void setDataEventDetails(newDetails) => dataEventDetails = newDetails;

  Map<String, dynamic> getDataEventCreated() => dataEventCreated;
  void setDataEventCreated(newCreated) => dataEventCreated= newCreated;

  List<Widget> getEventsList() => eventsList;
  void setEventsList(newEventsList) => eventsList = newEventsList;

  String? getTitreNEvent() => titreNEvent;
  void setTitreNEvent(newNTitre) => titreNEvent = newNTitre;

  String? getDescrNEvent() => descrNEvent;
  void setDescrNEvent(newNDescr) => descrNEvent = newNDescr;

  String? getDateNEvent() => dateNEvent;
  void setDateNEvent(newNDate) => dateNEvent = newNDate;

  String? getHeureNEvent() => heureNEvent;
  void setHeureNEvent(newNHeure) => heureNEvent = newNHeure;

  String? getLieuNEvent() => lieuNEvent;
  void setLieuNEvent(newNLieu) => lieuNEvent = newNLieu;


  Future<Connexion> postConnexion(String? dataId, String? dataMdp) async{
    final response = await http.post(
      Uri.parse('http://$ip/auth/signin'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "*/*",
        'connection': 'keep-alive',
        'Accept-Encoding' : 'gzip, deflate, br',
        'authorization': 'Basic '+ base64Encode(utf8.encode('$dataId:$dataMdp'))
      },
    );

    if (response.statusCode == 200) {
      var res = Connexion.fromJson(jsonDecode(response.body));
      dataTokenAuth = res.token;
      notifyListeners();
      return res;
    } else {
      throw Exception('Failed to get token');
    }
  }

  checkConnection(String? dataTokenAuth) {
    if (dataTokenAuth != null){
      return true;
    }else {
      return false;
    }
  }

  getUserCredentials(String? dataTokenAuth, String? dataId, String? dataMdp) {
    if (checkConnection(dataTokenAuth)){
      return {dataId,dataMdp};
    }
  }

  Future<Events> getUserEvents(String? dataTokenAuth) async{

    final response = await http.get(
      Uri.parse('http://$ip/events'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "*/*",
        'connection': 'keep-alive',
        'Accept-Encoding' : 'gzip, deflate, br',
        'authorization': 'Bearer $dataTokenAuth'
      },
    );

    if (response.statusCode == 200) {
      var res = Events.fromJson(jsonDecode(response.body));
      dataEventList = res.events;
      notifyListeners();
      return res;
    } else {
      throw Exception('Failed to get events');
    }
  }

  Future<EventDetail> getEventDetails(String? id, String? dataTokenAuth) async{
    final response = await http.get(
      Uri.parse('http://$ip/events/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': "*/*",
        'connection': 'keep-alive',
        'Accept-Encoding' : 'gzip, deflate, br',
        'authorization': 'Bearer '+ dataTokenAuth!,
      },
    );

    if (response.statusCode == 200) {
      var res = EventDetail.fromJson(jsonDecode(response.body));
      dataEventDetails = res.eventDetail;
      notifyListeners();
      return res;
    } else {
      throw Exception('Failed to get event details');
    }
  }

  Future<EventDetail> createEvent(String? titre,String? description,String? date,String?heure,String? lieu, String? dataTokenAuth) async{
    final response = await http.post(
        Uri.parse('http://$ip/events/create'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': "*/*",
          'connection': 'keep-alive',
          'Accept-Encoding' : 'gzip, deflate, br',
          'authorization': 'Bearer '+ dataTokenAuth!,
        },
        body: <String, String>{
          'titre': titre!,
          'description': description!,
          'date': date!,
          'heure': heure!,
          'lieu': lieu!
        }
    );

    if (response.statusCode == 200) {
      var res = EventDetail.fromJson(jsonDecode(response.body));
      dataEventDetails = res.eventDetail;
      notifyListeners();
      return res;
    } else {
      throw Exception('Failed to create new event');
    }
  }

  void disconnectUser() {
    if (checkConnection(dataTokenAuth!)){
      dataTokenAuth = "";
    }
    notifyListeners();
  }

  void addAllEvents() {
    eventsList.clear();
    for (var i=0; i < dataEventList.length; i++){
      var ajout = WidgetEvent(currentEvent: dataEventList[i]);
      eventsList.add(ajout);
    }
    notifyListeners();
  }
}