import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { response } from 'msw';
import MenuItem from 'react-native-paper/lib/typescript/components/Menu/MenuItem';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

const countUrl = 'http://172.28.212.103:8080/api/count';
const memberUrl = 'http://172.28.212.103:8080/api/member';

export const getBadgeCountUsingAxios = async () => {
    const response = await axios.get(countUrl);
    return response.data;
};

export const useBadgeCountUsingReactQuery = () => {
    const { data } = useQuery(['outputCount'], getBadgeCountUsingAxios);
    console.log("useBadgeCountUsingReactQuery");
    console.log({ data });
    return { data };
};

interface Count {
    count: number;
}

export const usetBadgeCountUsingAxios = async (x: any) => {
    console.log('count in usetBadgeCountUsingAxios: ', x);
    console.log('count in usetBadgeCountUsingAxios: ', x.cnt);
    const count = x.cnt;
    const response = await axios.post(encodeURI(countUrl), null, {
        params: {
            count
        },
    })
    .then(response => response.status)
    .catch(err => console.warn('err : ', err));

    return response;
}

export const checkMemberInfo = (id: string, password: string) => {
    console.log('id in checkMemberInfo: ', id);
    console.log('password in checkMemberInfo: ', password);
    return new Promise((resolve, reject) => {
        if (id !== '' && password !== '') {
            resolve(true);
        } else {
            reject(false);
        }
    });
};
export const checkMemberAxios = async (memberInfo: any) => {
    console.log('id : ', memberInfo.id);
    console.log('password : ', memberInfo.password);
    const id = memberInfo.id;
    const password = memberInfo.password;
    const response = await axios
        .post(encodeURI(memberUrl), null, {
            params: {
                id,
                password,
            },
        })
        .then(response => response.status)
        .catch(err => console.warn('err : ', err));

    return response;
};
