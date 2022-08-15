import { MouseProvider } from "./MouseProvider";
import { Dock, DockItem } from "./Dock";
import GradientCard from "./GradientCard";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const DockComponent = () => {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  if (!domReady) return <></>;

  return createPortal(
    <MouseProvider>
      <Dock>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/33.-Beauty-Bush.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/32.-Banana-Mania.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/01.-Royal-Heath.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/29.-Pale-Cornflower-Blue_1.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/05.-Flax.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/07.-Tidal.jpg" />
        </DockItem>
        <DockItem>
          <GradientCard src="https://products.ls.graphics/mesh-gradients/images/23.-California_1.jpg" />
        </DockItem>
      </Dock>
    </MouseProvider>,
    document.getElementById("dock-portal")
  );
};

export default DockComponent;
