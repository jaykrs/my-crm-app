export default async function Page({params} : {params:{slug : string}}) {
    const templateId = params.slug;
    let posts = await getCachedTemplate(templateId);
    return (<>
    <div dangerouslySetInnerHTML={{ __html: posts }} />
  </>)
}
  
  export async function getCachedTemplate(templateId : string) {
    const endpointUrl = process.env.API_HOST + 'templates?filters[name][$eq]=' + templateId;
    console.log("endpointUrl",endpointUrl);
    let templateData : any ;
    await fetch(endpointUrl,{ next: { revalidate: 3600 }}).then(async (response) => { if (response.status === 200) templateData = await response.json(); templateData = templateData.data[0].attributes.template; }).catch((error) => console.error("Error "+error));
    return templateData;
  };
  