import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: {
    $oid: string;
  };
}

export const getIdFromToken = (token: string): string => {
  const decodedToken = jwtDecode<DecodedToken>(token);
  return decodedToken.sub.$oid;
};
