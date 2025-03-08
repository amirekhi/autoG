import { GetBlogs } from "@/app/(admin)/Dash/CreateBlog/BlogUpload";
import AcoordionWrapper from "@/components/accordion/AcoordionWrapper";
import BBHero from "@/components/Blog/BBHero";
import BContent from "@/components/Blog/BContent";
import BHeader from "@/components/Blog/BHeader";
import { ExploreMore } from "@/components/Blog/ExploreMore";




 export const revalidate = 300; 



    export async function generateStaticParams() {
      const blogs = await GetBlogs(); // Fetch blogs at build time
    
      // Generate paths for static generation
      return blogs.map((blog) => ({
        url: blog.Url, // Pass URL as a param
      }));
    }
    



  export default async function BlogPage({ params }) {
   
    const {url} = await params
    
    const blogs = await GetBlogs();
    
    const blog = blogs.find((b) => b.Url === url);
    

     
  if (!blog) {
    return <h1>Blog not found</h1>;
  }

  return (
    <>
      <BBHero imgUrl={blog.HeroImgUrl} Title={blog.HeroTitle} Parag={blog.HeroParag} directionRtL={blog.directionRtL}/>
      <BHeader directionRtL={blog.directionRtL} HeaderImgUrl={blog.HeaderImgUrl} HeaderPublishedDate={blog.HeaderPublishedDate} HeaderAuthor={blog.HeaderAuthor} HeaderTiTle={blog.HeaderTitle} Headerdescribtion={blog.Headerdescribtion}/>
      <BContent directionRtL={blog.directionRtL} Contents={blog.htmlContent}/>  
      <AcoordionWrapper directionRtL={blog.directionRtL} QAs={blog.QAs}/>
      <ExploreMore Links={blog.Links}/> 

    </>
  );
}