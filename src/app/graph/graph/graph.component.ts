import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ConditionService } from '../../condition.service';
import { Condition } from '../../condition';
import { Patient } from '../../patient';
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

@Component({
  selector: 'app-graph',
  templateUrl: 'graph.component.html',
  styleUrls: ['graph.component.css']
})
export class GraphComponent implements OnChanges, AfterViewInit, OnInit {

  @Input() patient? :Patient | undefined;
  conditions! :Condition[];
  @ViewChild('container', { static: true })
  private container!: ElementRef;
  scene: THREE.Scene = new THREE.Scene();
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: TrackballControls;

  constructor(private _serviceCondition :ConditionService) { }

  ngOnInit(): void {
    this.initCubicGraph();
  }

  initCubicGraph() {
    this._serviceCondition.getListCondition().subscribe((dataArray: any[]) => {
      this.conditions = dataArray.map((data: any) => new Condition(data.id, data.temperature_max, data.temperature_min, data.saturation_max, data.saturation_min, data.etat, data.jour_min, data.jour_max));
      this.conditions.forEach(condition => {
        const cubeGeom = new THREE.BoxGeometry(condition.getWidth(), condition.getHeight(), condition.getDepth());
        const material = new THREE.MeshBasicMaterial({color: condition.getColor(),  opacity:0.4, transparent:true});
        const cube = new THREE.Mesh(cubeGeom, material);
        const _wireframe = new THREE.EdgesGeometry(cubeGeom);
        const wireframe = new THREE.LineSegments(_wireframe);
        cube.position.set(condition.getOrigin().x, condition.getOrigin().y, condition.getOrigin().z);
        this.scene.add(cube);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const change = changes[propName];
      const current :Patient  = change.currentValue;
      if (current) {
        this.clearPoint();
        for (const etat of current.etats) {
          this.addPointToGraph(etat.temperature, etat.saturation, etat.day);
        }
      }
    }
  }

  ngAfterViewInit() {
    const width = 500;
    const height = 500;

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.set(0, 20, 50);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xffffff,1);
    this.renderer.setSize(width, height);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    // Trackball Controls
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 3.0;
    this.controls.zoomSpeed = 0.5;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(0, 0, 1).normalize();
    this.scene.add(light);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(60, 60);
    this.scene.add(gridHelper);

    // Create x, y, and z axes
    const xArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 40, 0xff0000);
    this.scene.add(xArrow);
    const yArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 40, 0x00ff00);
    this.scene.add(yArrow);
    const zArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 40, 0x0000ff);
    this.scene.add(zArrow);

    // Create tick marks for x, y, and z axes
    const xTickMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const yTickMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const zTickMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const tickLength = 0.3;
    for (let i = 0; i <= 30; i += 1) {
      const xTickGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, tickLength, 0),
        new THREE.Vector3(i, -tickLength, 0),
      ]);
      const yTickGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(tickLength, i, 0),
        new THREE.Vector3(-tickLength, i, 0),
      ]);
      const zTickGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, tickLength, i),
        new THREE.Vector3(0, -tickLength, i),
      ]);
      const xTickLine = new THREE.Line(xTickGeometry, xTickMaterial);
      const yTickLine = new THREE.Line(yTickGeometry, yTickMaterial);
      const zTickLine = new THREE.Line(zTickGeometry, zTickMaterial);
      this.scene.add(xTickLine, yTickLine, zTickLine);
    }

    // Animate
    this.animate();
  }

  addPointToGraph(x: number, y:number, z:number) {
    const pointGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x / 10, y / 10, z)]);
    const pointMaterial = new THREE.PointsMaterial({color: 0xff0000, size: 0.8});
    const point = new THREE.Points(pointGeometry,pointMaterial);
    this.scene.add(point);
  }

  clearPoint() {
    for (let i = this.scene.children.length - 1; i >= 0; i--) {
      const child = this.scene.children[i];
      if (child instanceof THREE.Points) {
        this.scene.remove(child);
      }
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

}
