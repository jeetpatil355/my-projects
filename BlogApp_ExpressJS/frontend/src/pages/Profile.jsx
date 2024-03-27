/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { getUserDetails } from "../services/user"
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { renderDate } from '../services/renderDate';


const Profile = ({setName}) => {

    const [myDetail, setMyDetail] = React.useState({})
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const result = await getUserDetails()
            if (result['status'] === 'success') {

                const publishDates = result["data"].result.map((obj) => {
                    return { ...obj, created_at: renderDate(obj.created_at) }
                });
                setMyDetail(publishDates[0])
                
                const userName = `${result["data"].result[0].firstName} ${result["data"].result[0].lastName}`
                setName(userName)
            } else {
                toast.error(result["data"])
            }
        } catch (er) {
            return toast.error(er.message)
        }
    }

    const handleClick = () =>{
        navigate("/change-my-password")
    }

    React.useEffect(() => {
        getData()
    }, [])
    return (
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", flexDirection: "column" }}>
            <Card variant="outlined"
                style={{
                    minWidth: "50%",
                    minHeight: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "10px"
                }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        My details
                    </Typography>
                    <Typography variant="h5" component="div">
                        Name :
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {myDetail.firstName} {myDetail.lastName}.
                    </Typography>
                    <Typography variant="h5" component="div">
                        Email :
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {myDetail.email}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Phone No :
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {myDetail.phone_number}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Created At :
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {myDetail.created_at}
                    </Typography>
                </CardContent>
            </Card>

            <Card variant="outlined"
                style={{
                    minWidth: "50%",
                    minHeight: "50%",
                    margin: "10px"
                }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        to change your password go to
                    </Typography>
                    <Typography variant="h5" component="div">
                        Change My Password
                    </Typography>
                    <Typography sx={{ mb: 1.5, mt: 2 }} color="text.secondary">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{textTransform: "capitalize"}}
                            onClick={handleClick}
                        >
                            Change Password
                        </Button>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}


export default Profile
