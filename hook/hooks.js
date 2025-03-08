import { useState, useEffect } from 'react';
import { GetBlogs , GetBlog} from '@/app/(admin)/Dash/CreateBlog/BlogUpload';


export  const useGettingBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
    setLoading(true)
    const res = await GetBlogs()
    
    setData(res) 
    setLoading(false)
    };

    fetchData();
  }, []);

  return [ data ,  loading ];
};




 export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = async (asyncFunction) => {
    try {
      setLoading(true);
      return await asyncFunction();
    } finally {
      setLoading(false); // Ensures loading is false even if there's an error
    }
  };

  return [loading, withLoading];
};





export  const useGettingBlog = ({id}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
    setLoading(true)
    const res = await GetBlog(id)
    
    setData(res) 
    setLoading(false)
    };

    fetchData();
  }, []);

  return [ data ,  loading ];
};

export const useGettingCars = ( ) => {
  const [Cars , setCars] = useState([])
  const [Loading , setLoading] = useState(true)

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        const res = await fetch('/api/Cars' ,{cache : 'no-store'});
        const data = await res.json();
        setCars(data);
        setLoading(false)
      };
  
      fetchData();
      
    }, []);
    
  return [Cars , Loading]
}


export const useGettingHotCars = ( ) => {
  const [Cars , setCars] = useState([])
  const [Loading , setLoading] = useState(true)

  useEffect(() => {
     const fetchData = async () => {
       setLoading(true)
       const res = await fetch('/api/Cars' ,{cache : 'no-store' , 
          headers: {
         'Content-Type': 'application/json',
         'type' : 'HotCars'
       }});
       const data = await res.json();
       setCars(data);
       setLoading(false)
     };
 
     fetchData();
     
   }, []);
 
    
  return [Cars , Loading]
}