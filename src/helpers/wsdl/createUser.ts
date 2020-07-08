export const createUserXml = `<definitions name = "UserService"
targetNamespace = "http://www.examples.com/wsdl/UserService.wsdl"
xmlns = "http://schemas.xmlsoap.org/wsdl/"
xmlns:soap = "http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:tns = "http://www.examples.com/wsdl/UserService.wsdl"
xmlns:xsd = "http://www.w3.org/2001/XMLSchema">

<message name = "CreateUserRequest">
   <part name = "document" type = "xsd:string"/>
   <part name = "name" type = "xsd:string"/>
   <part name = "lastName" type = "xsd:string"/>
   <part name = "email" type = "xsd:string"/>
   <part name = "phone" type = "xsd:string"/>
</message>
 
<message name = "CreateUserResponse">
   <part name = "name" type = "xsd:string"/>
   <part name = "name" type = "xsd:string"/>
   <part name = "lastName" type = "xsd:string"/>
   <part name = "email" type = "xsd:string"/>
   <part name = "phone" type = "xsd:string"/>
</message>

<message name = "RechargeWalletRequest">
   <part name = "document" type = "xsd:string"/>
   <part name = "phone" type = "xsd:string"/>
</message>
 
<message name = "RechargeWalletResponse">
   <part name = "balance" type = "xsd:number"/>
</message>

<portType name = "User_PortType">
   <operation name = "createUser">
      <input message = "tns:CreateUserRequest"/>
      <output message = "tns:CreateUserResponse"/>
   </operation>
   <operation name = "rechargeWallet">
      <input message = "tns:RechargeWalletRequest"/>
      <output message = "tns:RechargeWalletResponse"/>
   </operation>
</portType>

<binding name = "User_Binding" type = "tns:User_PortType">
   <soap:binding style = "rpc"
      transport = "http://schemas.xmlsoap.org/soap/http"/>
   <operation name = "createUser">
      <soap:operation soapAction = "createUser"/>
      <input>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:userservice"
            use = "encoded"/>
      </input>
     
      <output>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:userservice"
            use = "encoded"/>
      </output>
   </operation>
   <operation name = "rechargeWallet">
      <soap:operation soapAction = "rechargeWallet"/>
      <input>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:userservice"
            use = "encoded"/>
      </input>
     
      <output>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:userservice"
            use = "encoded"/>
      </output>
   </operation>
</binding>

<service name = "User_Service">
   <documentation>WSDL File for UserService</documentation>
   <port binding = "tns:User_Binding" name = "User_Port">
      <soap:address
         location = "http://www.examples.com/UserService/" />
   </port>
</service>
</definitions>`;
