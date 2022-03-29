class EventDetail {
  final eventDetail;

  const EventDetail({
    required this.eventDetail
  });

  factory EventDetail.fromJson(Map<String, dynamic> json) {
    return EventDetail(
        eventDetail: json['event']
    );
  }
}