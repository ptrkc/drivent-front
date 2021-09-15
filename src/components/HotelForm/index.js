import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";

import useApi from "../../hooks/useApi";
import { DashWarning } from "../Dashboard/DashWarning";
import HotelRooms from "./HotelRoom/HotelRooms";
import HotelOverview from "./HotelOverview";
import UserContext from "../../contexts/UserContext";

export default function HotelForm() {
  const { booking } = useApi();
  const { userData } = useContext(UserContext);
  const [isOnline, setIsOnline] = useState(null);
  
  useEffect(() => {
    booking.getBookingInfo()
      .then(response => {
        if(response.status === 200) {
          const bookDetails = response.data;
          setIsOnline(bookDetails.isOnline);
        };
      })
      .catch(() => {
        toast("Não foi possível encontrar sua reserva");
      });
  }, []);

  function RenderProperHotelStatus() {
    return (
      <>
        {
          userData.booking.roomId
            ? <HotelOverview />
            : <HotelRooms />
        }
      </>
    );
  }

  return (
    <>
      <StyledTypography variant="h4" color="initial">Escolha de hotel e quarto</StyledTypography>
      {
        userData.paid
          ? isOnline
            ? <DashWarning variant="h6">
              Sua modalidade de ingresso não inclui hospedagem <br/> Prossiga para a escolha de atividades
            </DashWarning>
            : <RenderProperHotelStatus />
          : <DashWarning variant="h6">
              Você precisa ter confirmado pagamento antes <br/> de fazer a escolha de hospedagem
          </DashWarning>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
