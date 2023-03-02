import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";

function App() {

  const queryClient = new QueryClient({ defaultOptions : {

    queries : {
      refetchOnWindowFocus : false
    }

  } })
  return(<>
  <QueryClientProvider client={queryClient}>
      <Router />
      </QueryClientProvider>
  
  </>)
}
//삭제가 두 번 발동되는 이슈
export default App;
