import BHero from '@/components/Blogs/BHero'
import BlogContentWrapper from '@/components/Blogs/BlogContentWrapper'
// import ClientBlogCardWrapper from '@/components/DashBlogs/ClientBlogCardWrapper'

import React from 'react'

const page = () => {
  return (
   <>
     <BHero/>
     {/* <ClientBlogCardWrapper /> */}
     <BlogContentWrapper/>
   </>
  )
}

export default page