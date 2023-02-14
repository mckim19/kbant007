import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { response } from 'msw';
import MenuItem from 'react-native-paper/lib/typescript/components/Menu/MenuItem';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

const springUrl = 'http://172.28.213.59:8080/api/count';
export const getBadgeCountUsingAxios = async () => {
    const response = await axios.get(springUrl);
    return response.data;
};

export const useBadgeCountUsingReactQuery = () => {
    const { data } = useQuery(['outputCount'], getBadgeCountUsingAxios);
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
    const response = await axios.post(encodeURI(springUrl), null, {
        params: {
            count
        },
    })
    .then(response => response.status)
    .catch(err => console.warn('err : ', err));

    return response;
}


