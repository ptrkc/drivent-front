import { useEffect, useState } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import useApi from "../../hooks/useApi";

import Tickets from "./Tickets";
import ReservationOverview from "./ReservationOverview";

export default function PaymentForm() {
  const { enrollment } = useApi();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [hasReservation, setHasReservation] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState();
          
  useEffect(() => {
    enrollment.getPersonalInformations().then(response => {
      if (response.status !== 200) {
        return;
      }
      setIsEnrolled(true);
    });
    setHasReservation(true);
  }, []);
  
  return (
    <>
      <StyledTypography variant="h4" color="initial">Ingresso e pagamento</StyledTypography>
      {
        isEnrolled
          ? hasReservation?<ReservationOverview setSelectedTicket={setSelectedTicket} selectedTicket={selectedTicket} />:<Tickets setSelectedTicket={setSelectedTicket} selectedTicket={selectedTicket} />
          : <NoEnrollmentWarning variant="h6">
              Você precisa completar sua inscrição antes<br/> de prosseguir pra escolha de ingresso
          </NoEnrollmentWarning>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const NoEnrollmentWarning = styled(Typography)`
  color: #8E8E8E;
  text-align: center;
  margin-top: 180px!important;
  line-height: 23px!important;
`;
