import "reflect-metadata";
import { Container } from "inversify";
import cacheContainerForDecorators from "@utilities/constants/cachedInjection";
import bindAllDependencies from "./bindAllDependencies";
const container = new Container({ autoBindInjectable: true });

cacheContainerForDecorators(container);

bindAllDependencies(container);

export default container;
