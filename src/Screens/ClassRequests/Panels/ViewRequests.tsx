import React from "react";

const ViewRequests = () => {
  /**
     * 
  const handleRequestAccept = async (classAssignId: number) => {
    const [classRequests, setClassRequests] = useState<ClassAssign[]>([]);
    const requests = await ClassAssignService.getRequests();
    setClassRequests(requests);
    try {
      await ClassAssignService.acceptRequest(classAssignId);
      setClassRequests((oldClassRequests) =>
        oldClassRequests.filter(
          (classRequest) => classRequest.id !== classAssignId
        )
      );
      await fetchSchedule();
    } catch (e) {
      toast.error("אירעה שגיאה באישור הבקשה");
    }
  };
  const handleRequestReject = async (classAssignId: number) => {
    try {
      await ClassAssignService.rejectRequest(classAssignId);
      setClassRequests((oldClassRequests) =>
        oldClassRequests.filter(
          (classRequest) => classRequest.id !== classAssignId
        )
      );
    } catch (e) {
      toast.error("אירעה שגיאה בדחיית הבקשה");
    }
  };
     */
  return <div>ViewRequests</div>;
};

export default ViewRequests;
