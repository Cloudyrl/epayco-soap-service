export const TransacionXml = `<definitions name = "TransacionService"
targetNamespace = "http://www.examples.com/wsdl/UserService.wsdl"
xmlns = "http://schemas.xmlsoap.org/wsdl/"
xmlns:soap = "http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:tns = "http://www.examples.com/wsdl/UserService.wsdl"
xmlns:xsd = "http://www.w3.org/2001/XMLSchema">

<message name = "CreateTransactionRequest">
   <part name = "document" type = "xsd:string"/>
   <part name = "phone" type = "xsd:string"/>
   <part name = "value" type = "xsd:number"/>
   <part name = "auth_token" type = "xsd:string"/>
</message>
 
<message name = "CreateTransactionResponse">
   <part name = "session_id" type = "xsd:string"/>
</message>

<message name = "ConfirmTransactionRequest">
   <part name = "session_id" type = "xsd:string"/>
   <part name = "token" type = "xsd:string"/>
   <part name = "auth_token" type = "xsd:string"/>
</message>
 
<message name = "ConfirmTransactionResponse">
   <part name = "message" type = "xsd:string"/>
</message>

<portType name = "Transaction_PortType">
   <operation name = "createTransaction">
      <input message = "tns:CreateTransactionRequest"/>
      <output message = "tns:CreateTransactionResponse"/>
   </operation>
   <operation name = "confirmTransaction">
      <input message = "tns:ConfirmTransactionRequest"/>
      <output message = "tns:ConfirmTransactionResponse"/>
   </operation>
</portType>

<binding name = "Transaction_Binding" type = "tns:Transaction_PortType">
   <soap:binding style = "rpc"
      transport = "http://schemas.xmlsoap.org/soap/http"/>
   <operation name = "createTransaction">
      <soap:operation soapAction = "createTransaction"/>
      <input>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:transactionservice"
            use = "encoded"/>
      </input>
     
      <output>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:transactionservice"
            use = "encoded"/>
      </output>
   </operation>
   <operation name = "confirmTransaction">
      <soap:operation soapAction = "confirmTransaction"/>
      <input>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:transactionservice"
            use = "encoded"/>
      </input>
     
      <output>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:transactionservice"
            use = "encoded"/>
      </output>
   </operation>
</binding>

<service name = "Transaction_Service">
   <documentation>WSDL File for UserService</documentation>
   <port binding = "tns:Transaction_Binding" name = "Transaction_Port">
      <soap:address
         location = "http://www.examples.com/TransactionService/" />
   </port>
</service>
</definitions>`;
