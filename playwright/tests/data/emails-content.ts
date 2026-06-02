export default {
  pending: {
    guestSubject: 'Your reservation has been received',
    managerSubjectFor: (id: string) => `New reservation request — ${id}`,
  },
  accepted: {
    guestSubjectFor: (id: string) => `Your reservation is confirmed — ${id}`,
    guestHeading: 'Reservation Confirmed!',
  },
  cancelled: {
    guestSubjectFor: (id: string) => `Your reservation has been cancelled — ${id}`,
    guestHeading: 'Reservation Cancelled',
    managerSubjectFor: (id: string) => `Reservation cancelled — ${id}`,
    managerHeading: 'Reservation Cancelled',
  },
  rejected: {
    guestSubjectFor: (id: string) => `Update on your reservation request — ${id}`,
    guestHeading: 'Reservation Update',
  },
};
