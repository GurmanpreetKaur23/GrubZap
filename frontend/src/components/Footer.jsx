export default function Footer() {
  return (
    <div className="overflow-hidden">
      <div className="w-screen h-[600px] bg-no-repeat bg-left-bottom footerCurves"></div>
      <div className="bg-amber-400 w-full h-72">
        <div className="w-[75%] h-72 mx-auto flex justify-between ">
          <div className="flex-col p-2 w-fit">
            <h1 className="text-5xl font-semibold">GrubZap</h1>
            <h1 className="text-5xl font-semibold">GrubZap</h1>
            <h1 className="text-5xl font-semibold">GrubZap</h1>
            <h1 className="text-5xl font-semibold">GrubZap</h1>
            <h1 className="text-right text-lg pr-1">&copy;2025</h1>
          </div>
          <div className="flex justify-between w-1/2 border-l-2 border-black h-fit pl-8">
            <div className="w-1/2 p-4">
              <h1 className="text-2xl font-semibold pb-4">Company</h1>
              <ul>
                <li>About</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div className="w-1/2 p-4">
              <h1 className="text-2xl font-semibold pb-4">Connect with us</h1>
              <ul>
                <li>Instagram</li>
                <li>Mail</li>
                <li>Whatsapp</li>
              </ul>
            </div>

            <div className="w-1/2 p-4">
              <h1 className="text-2xl font-semibold pb-4">Our partners</h1>
              <ul>
                <li>the indian kitchen</li>
                <li>pai tiffins</li>
                <li>dollops</li>
                <li>the mill</li>
                <li>dexters</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
