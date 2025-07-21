export default function MainLayout(
  {
    children
  }
  :{
    children:React.ReactNode;
  }
){

  return (
    <html>
      
      <body>
        <h1>Welcome the Page</h1>
        {children}
      </body>
    </html>
  );
}