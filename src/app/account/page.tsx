import DefaultLayout from "@/components/Layouts/DefaultLayout"

interface accountProp{

}

const Account : React.FC<accountProp> = ()=>{
    return(
        <DefaultLayout>
            <div>Account</div>
        </DefaultLayout>
    )
}

export default Account;