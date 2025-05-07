
import React from 'react';
import { Button } from "@/components/ui/button";

const AppPromotion = () => {
  return (
    <section className="bg-gradient-to-r from-grubzap-orange to-grubzap-red text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/44d718c2-c665-4c4a-b504-d07049172178.png')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Download the GrubZap app for faster ordering
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Get exclusive app-only deals, track your delivery in real time, and order your favorites with just one tap!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-black hover:bg-black/80 flex items-center gap-2 px-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5227 7.39905C17.3094 7.5614 16.9772 7.76944 16.5264 8.02319C16.0756 8.27695 15.7139 8.48499 15.4414 8.64734C14.3224 9.33414 13.7631 9.67753 13.7631 9.67753C13.7631 9.67753 13.7631 9.67753 13.7631 9.67753C13.2531 10.0001 12.6345 10.1614 11.9568 10.1614C11.2791 10.1614 10.6605 10.0001 10.1505 9.67753C10.1505 9.67753 10.1505 9.67753 10.1505 9.67753C10.1505 9.67753 9.59119 9.33414 8.47221 8.64734C8.19969 8.48499 7.83805 8.27695 7.38726 8.02319C6.93647 7.76944 6.6043 7.5614 6.39094 7.39905C5.67389 6.87448 5.11458 6.2729 4.71301 5.5943C4.31144 4.9157 4.11066 4.19141 4.11066 3.42143C4.11066 2.46564 4.42025 1.65799 5.03944 1.00848C5.65862 0.358968 6.45568 0.0342126 7.43061 0.0342126H16.483C17.4579 0.0342126 18.255 0.358968 18.8742 1.00848C19.4934 1.65799 19.803 2.46564 19.803 3.42143C19.803 4.19141 19.6022 4.9157 19.2006 5.5943C18.7991 6.2729 18.2398 6.87448 17.5227 7.39905Z" fill="white" />
                  <path d="M14.8431 13.2924C14.8431 14.2482 14.5335 15.0559 13.9143 15.7054C13.2951 16.3549 12.498 16.6797 11.5231 16.6797H7.43061C6.45568 16.6797 5.65862 16.3549 5.03944 15.7054C4.42025 15.0559 4.11066 14.2482 4.11066 13.2924C4.11066 12.5225 4.31144 11.7982 4.71301 11.1195C5.11458 10.441 5.67389 9.83937 6.39094 9.3148C6.6043 9.15246 6.93647 8.94442 7.38726 8.69066C7.83805 8.4369 8.19969 8.22886 8.47221 8.06651C9.59119 7.37971 10.1505 7.03632 10.1505 7.03632C10.1505 7.03632 10.1505 7.03632 10.1505 7.03632C10.6605 6.71374 11.2791 6.55245 11.9568 6.55245C12.6345 6.55245 13.2531 6.71374 13.7631 7.03632C13.7631 7.03632 13.7631 7.03632 13.7631 7.03632C13.7631 7.03632 14.3224 7.37971 15.4414 8.06651C15.7139 8.22886 16.0756 8.4369 16.5264 8.69066C16.9772 8.94442 17.3094 9.15246 17.5227 9.3148C18.2398 9.83937 18.7991 10.441 19.2006 11.1195C19.6022 11.7982 19.803 12.5225 19.803 13.2924C19.803 14.2482 19.4934 15.0559 18.8742 15.7054C18.255 16.3549 17.4579 16.6797 16.483 16.6797H15.7659V22.9658C15.7659 23.2883 15.6736 23.5553 15.4889 23.7669C15.3042 23.9784 15.0609 24.0842 14.759 24.0842C14.4571 24.0842 14.2138 23.9784 14.0291 23.7669C13.8444 23.5553 13.7521 23.2883 13.7521 22.9658V13.2924H14.8431Z" fill="white" />
                </svg>
                App Store
              </Button>
              <Button className="bg-black hover:bg-black/80 flex items-center gap-2 px-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.16187 0.414062C3.02612 0.554687 2.95825 0.773437 2.95825 1.07031V22.9297C2.95825 23.2266 3.02612 23.4453 3.16187 23.5859L3.229 23.6531L13.9584 12.9531V12.8672L3.229 2.16797L3.16187 2.23438Z" fill="white" />
                  <path d="M18.0256 16.9688L13.9584 12.9531V12.8672L18.0256 8.85156L18.1037 8.89844L22.9428 11.7188C24.2318 12.4297 24.2318 13.5703 22.9428 14.2812L18.1037 17.1016L18.0256 16.9688Z" fill="white" />
                  <path d="M18.1037 17.1016L13.9584 13L3.16187 23.5859C3.61649 24.0703 4.3615 24.1172 5.19369 23.6328L18.1037 17.1016Z" fill="white" />
                  <path d="M18.1037 8.89844L5.19369 2.36719C4.3615 1.88281 3.61649 1.92969 3.16187 2.41406L13.9584 13L18.1037 8.89844Z" fill="white" />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 h-96">
              <div className="absolute top-0 w-48 h-80 bg-white rounded-3xl shadow-xl transform -rotate-6 z-10">
                <div className="w-full h-full rounded-3xl overflow-hidden border-8 border-white">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/44d718c2-c665-4c4a-b504-d07049172178.png" 
                      alt="GrubZap App" 
                      className="h-16 w-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-10 left-20 w-48 h-80 bg-white rounded-3xl shadow-xl transform rotate-6">
                <div className="w-full h-full rounded-3xl overflow-hidden border-8 border-white">
                  <div className="w-full h-full bg-grubzap-dark flex flex-col">
                    <div className="h-32 bg-grubzap-orange flex items-center justify-center">
                      <span className="text-white font-bold text-xl">GrubZap</span>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="h-4 w-3/4 bg-gray-200 rounded-full mb-3"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded-full mb-6"></div>
                      <div className="h-10 w-full bg-gray-200 rounded-lg mb-3"></div>
                      <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromotion;
